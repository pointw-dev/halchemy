import axios, {AxiosError} from "axios"
import {ReadOnlyRequester, Requester} from "./requester";
import {HalLink, HalResource} from "hal-types";
import {Follower} from "./follower";
import {Request, Response} from "./http_model";
import {enhanceHalResource, isHalResource} from "./hal_helpers";
import {CaseInsensitiveHeaders} from "./case_insensitive_headers";
import {ErrorHandling} from "./errorHandling";
import {loadConfig} from "./configuration";
import {HalchemyMetadata} from "./metadata";
import {doSettingsIncludeStatusCode} from "./status_codes";

export class Api {

    private _headers: CaseInsensitiveHeaders = new CaseInsensitiveHeaders({})
    private _baseUrl: string = ''
    public errorHandling : ErrorHandling = {
        raiseForNetworkErrors: true,
        raiseForStatusCodes: null
    }

    public parametersListStyle: string = 'repeat_key'
    public etagField: string = '_etag'

    //////////////////////////////////////////////////////////////////////////////////////////
    // DEPRECATED
    private lastError: any = {}
    // DEPRECATED
    //////////////////////////////////////////////////////////////////////////////////////////

    constructor(baseUrl: string | null, headers = {}) {
        const config = loadConfig()
        this._baseUrl = baseUrl as string ?? config.halchemy.baseUrl
        this.parametersListStyle = config.halchemy.parametersListStyle
        this.etagField = config.halchemy.etagField
        this.errorHandling = config.errorHandling
        this._headers = new CaseInsensitiveHeaders({
            ...config.headers,
            ...headers
        })

        if (!this._baseUrl) {
            throw new Error('You must provide a base URL, either in the constructor or in a config file.')
        }
        axios.defaults.baseURL = this._baseUrl
    }

    get baseUrl() {
        return this._baseUrl
    }

    set baseUrl(newBaseUrl: string) {
        this._baseUrl = newBaseUrl
        axios.defaults.baseURL = newBaseUrl
    }

    get headers(): Record<string, string> {
        return this._headers.toObject()
    }

    set headers(newHeaders: Record<string, string>) {
        this._headers = new CaseInsensitiveHeaders(newHeaders)
    }

    addHeaders(newHeaders: Record<string, string>) {
        this._headers = this._mergeHeaders(this._headers, new CaseInsensitiveHeaders(newHeaders))
    }

    removeHeaders(removeHeaders: string[]) {
        removeHeaders.forEach((header) => {
            this._headers.delete(header)
        })
    }

    public get root() {
        return this.usingEndpoint('/', true)
    }

    usingEndpoint(url: string, isRoot: boolean = false): Requester | ReadOnlyRequester {
        if (isRoot) {
            return new ReadOnlyRequester(this, url)
        }
        return new Requester(this, url)
    }

    follow(resource: HalResource): Follower {
        return new Follower(this, resource)
    }

    async request(method: string, url: string, data: any = null, headers: Record<string, string> = {}) {
        if (data == 'true' || data == 'false') {
            data = JSON.stringify(data)
        }
        const merged_headers: CaseInsensitiveHeaders = this._mergeHeaders(this._headers, new CaseInsensitiveHeaders(headers))
        let request = new Request(method, url, merged_headers, data)
        try {
            const result = await axios.request({
                method: method,
                url: url,
                data: data,
                headers: merged_headers.toObject()
            })

            request.url = (result.config.url as string).startsWith('http') ? result.config.url : this._baseUrl + result.config.url
            request.headers = new CaseInsensitiveHeaders(result.config.headers)
            request.body = result.config.data

            const responseHeaders = new CaseInsensitiveHeaders(result.headers as {})
            const response = new Response(result.status, result.statusText, responseHeaders, result.data)

            let rtn: any
            if (!isHalResource(result.data)) {
                rtn =  {}
            } else {
                rtn = result.data as HalResource
                enhanceHalResource(rtn)
            }
            rtn._halchemy = new HalchemyMetadata(request, response, null)
            return rtn
        } catch (error) {
            return this._handleError(method, url, error, request)
        }
    }

    private _mergeHeaders(baseHeaders: CaseInsensitiveHeaders, additionalHeaders: CaseInsensitiveHeaders): CaseInsensitiveHeaders {
        // Merge headers manually
        const mergedHeaders = new CaseInsensitiveHeaders();

        // Add base headers
        for (const key of Object.keys(baseHeaders.toObject())) {
            mergedHeaders.set(key, baseHeaders.get(key)!);
        }

        // Override with or add new headers
        for (const key of Object.keys(additionalHeaders.toObject())) {
            mergedHeaders.set(key, additionalHeaders.get(key)!);
        }

        return mergedHeaders
    }

    private _handleError(method: string, url: string, error: AxiosError<unknown, any> | any, request: Request   ) {
        let errorResponse: any;

        if (error?.isAxiosError && error.hasOwnProperty('response')) {
            // i.e. if we received a response from the server
            const axiosError = error as AxiosError;
            errorResponse = axiosError.response; //all the info here
            const data = errorResponse.hasOwnProperty('data')? errorResponse.data : null
            const request = new Request(method, url, new CaseInsensitiveHeaders(errorResponse.config.headers), errorResponse.config.data)
            const response = new Response(errorResponse.status, errorResponse.statusText, new CaseInsensitiveHeaders(errorResponse.headers), data)
            const resource = {
                _halchemy: new HalchemyMetadata(request, response, error)
            }
            if (doSettingsIncludeStatusCode(this.errorHandling.raiseForStatusCodes, errorResponse.status)) {
                throw resource
            }
            return resource
        } else {
            // we did not receive a response from the server
            const response = new Response(0, 'Did not receive a response from the server', new CaseInsensitiveHeaders({}), '')
            const resource = {
                _halchemy: new HalchemyMetadata(request, response, error)
            }
            if (this.errorHandling.raiseForNetworkErrors) {
                throw resource
            }
            return resource
        }
    }

    getOptimisticConcurrencyHeader(resource: HalResource): CaseInsensitiveHeaders {
        if (!resource._halchemy || !resource._halchemy.response || !resource._halchemy.response.headers) {
            return new CaseInsensitiveHeaders({})
        }
        const etag = resource._halchemy?.response?.headers.get('Etag') || resource[this.etagField]
        return etag? new CaseInsensitiveHeaders({'If-Match': etag}) : new CaseInsensitiveHeaders({})
    }
}
