import axios, {AxiosError} from "axios"
import {ReadOnlyRequester, Requester} from "./requester";
import {HalLink, HalResource} from "hal-types";
import {Follower} from "./follower";
import {Request, Response} from "./http_model";
import {enhanceHalResource, isHalResource} from "./hal_helpers";
import {CaseInsensitiveHeaders} from "./case_insensitive_headers";

//////////////////////////////////////////////////////////////////////////////////////////
// DEPRECATED
import {HttpError, TemplateValuesMissingError} from "./errors";
import {ErrorHandling} from "./errorHandling";
import {doSettingsIncludeStatusCode} from "./status_codes";
import {HalchemyMetadata} from "./metadata";

export {TemplateValuesMissingError, HttpError} from './errors'
// DEPRECATED
//////////////////////////////////////////////////////////////////////////////////////////


export class Api {

    private _headers: CaseInsensitiveHeaders = new CaseInsensitiveHeaders({})
    private _baseUrl: string = ''
    public errorHandling : ErrorHandling = {
        raiseForNetworkError: true,
        raiseForStatusCodes: null
    }

    public parametersListStyle: string = 'repeat_key'
    public etagField: string = '_etag'

    //////////////////////////////////////////////////////////////////////////////////////////
    // DEPRECATED
    private lastError: any = {}
    // DEPRECATED
    //////////////////////////////////////////////////////////////////////////////////////////

    constructor(baseApiUrl: string, headers = {}) {
        this.errorHandling.raiseForNetworkError = true
        this.errorHandling.raiseForStatusCodes = null

        this._headers = new CaseInsensitiveHeaders({
            'Content-type': 'application/json',
            Authorization: 'Basic cm9vdDpwYXNzd29yZA==',  // root:password
            Accept: 'application/hal+json, application/json;q=0.9, */*;q=0.8',
            ...headers
        })
        this._baseUrl = baseApiUrl

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
        const merged_headers = this._mergeHeaders(this._headers, new CaseInsensitiveHeaders(headers))
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
            if (this.errorHandling.raiseForNetworkError) {
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



    //////////////////////////////////////////////////////////////////////////////////////////
    // DEPRECATED
    async get(url:string = '/', headers = {}): Promise<HalResource | {}> {
        const merged_headers = {
            ...this.headers,
            ...headers
        }
        try {
            this.lastError = {}
            const response = await axios.get(url, {headers: merged_headers})
            if (isHalResource(response.data)) {
                return response.data as HalResource
            } else {
                return response.data as {}
            }
        } catch (error) {
            // let message = 'Unknown error'
            // if (error instanceof Error) { message = error.message }
            this.handleError('GET', error, url)
            return {}
        }
    }

    async getFromRel({resource, rel, parameters = {}, template = {}}: RelSpec, headers = {}): Promise<HalResource | {}> {
        const url = this.urlFromRel({resource, rel, parameters, template})
        return await this.get(url, headers)
    }


    async postToRel({resource, rel, parameters = {}, template = {}}: RelSpec, data:{}, headers = {}): Promise<any> {
        const merged_headers = {
            ...this.headers,
            ...headers
        }
        const url = this.urlFromRel({resource, rel, parameters, template})
        try {
            this.lastError = {}
            const response = await axios.post(url, data, {headers: merged_headers})
            return response.data
        } catch(error) {
            this.handleError('POST', error, url)
        }
    }


    async deleteResource(resource:HalResource, headers = {}) {
        const merged_headers = {
            ...this.headers,
            ...headers,
            'If-match': resource._etag
        }
        const url = this.urlFromRel({resource, rel: 'self'})
        try {
            this.lastError = {}
            const response = await axios.delete(url, {headers: merged_headers})
            return response.data
        } catch(error) {
            this.handleError('DELETE', error, url)
        }
    }


    async patchResource(resource:HalResource, data:{}, headers = {}): Promise<any> {
        const merged_headers = {
            ...this.headers,
            ...headers,
            'If-match': resource._etag
        }
        const url = this.urlFromRel({resource, rel: 'self'})
        try {
            this.lastError = {}
            const response = await axios.patch(url, data, {headers: merged_headers})
            return response.data
        } catch(error) {
            this.handleError('PATCH', error, url)
        }
    }


    async putToRel({resource, rel, parameters = {}, template = {}}: RelSpec, data:{}, headers = {}): Promise<HalResource | {}> {
        const merged_headers = {
            ...this.headers,
            ...headers,
            'If-match': resource._etag
        }
        const url = this.urlFromRel({resource, rel, parameters, template})
        try {
            this.lastError = {}
            const response = await axios.put(url, data, {headers: merged_headers})
            return response.data
        } catch(error) {
            this.handleError('PUT', error, url)
            return {}
        }
    }


    async getFromRelWithLookup({resource, rel, parameters = {}, template = {}}: RelSpec, lookup: string, headers = {}): Promise<HalResource | {}> {
        const link = resource._links[rel] as HalLink
        let url: string = link.href;

        if (url.charAt(url.length-1) != '/') {
            url += '/'
        }
        url += lookup

        if (link.templated) {
            url = this.fillTemplate(url, template);
        }
        url = this.addQueryString(url, parameters);

        return await this.get(url, headers)
    }


    async postToUrl(url:string, data: {}, headers = {}): Promise<any> {
        const merged_headers = {
            ...this.headers,
            ...headers
        }
        try {
            this.lastError = {}
            const response = await axios.post(url, data, {headers: merged_headers})
            return response.data
        } catch(error) {
            this.handleError('POST', error, url)
        }
    }


    async deleteUrl(url: string, headers = {}) {
        const merged_headers = {
            ...this.headers,
            ...headers
        }
        try {
            this.lastError = {}
            const response = await axios.delete(url, {headers: merged_headers})
            return response.data
        } catch(error) {
            this.handleError('DELETE', error, url)
        }
    }


    urlFromRel({resource, rel, parameters = {}, template = {}}: RelSpec): string {
        const link = resource._links[rel] as HalLink
        let url: string = link.href;

        if (link.templated) {
            url = this.fillTemplate(url, template);
        }
        return this.addQueryString(url, parameters);
    }


    private addQueryString(url: string, parameters: { [p: string]: any }) {
        const queryString: string = Object.entries(parameters)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');


        return `${url}${queryString ? '?' : ''}${queryString}`;
    }


    private fillTemplate(url: string, template: { [p: string]: string }) {
        const segments: Set<string> = new Set()
        const regex: RegExp = /\{([^}]+)}/g;
        let match: RegExpExecArray | null
        while ((match = regex.exec(url)) !== null) {
            segments.add(match[1])
        }
        if (Object.keys(template).length === 0) {
            throw new TemplateValuesMissingError(
                'You must supply templates for templated links',
                Array.from(segments)
            )
        }

        const missingValues = Array.from(segments).filter(segment => !template.hasOwnProperty(segment));
        if (missingValues.length > 0) {
            throw new TemplateValuesMissingError('The template provided is missing values', missingValues)
        }

        return url.replace(/\{([^}]+)}/g, (match, segment) => {
            return template[segment] || match;
        })
    }


    private handleError(method: string, error: AxiosError<unknown, any> | Error | any, url: string) {
        let errorResponse: any;

        if ( (error instanceof AxiosError) && (error as AxiosError)?.isAxiosError && error.hasOwnProperty('response')) {
            // i.e. if we received a response from the server
            const axiosError = error as AxiosError;
            errorResponse = axiosError.response; //all the info here
            const data = errorResponse.hasOwnProperty('data')? errorResponse.data : null
            this.lastError = {
                method,
                url,
                'statusCode': errorResponse.status,
                'reason': errorResponse.statusText,
                'details': data,
                'response': errorResponse,
                'error': error
            }
            throw new HttpError(`${method} request failed`, errorResponse.status, errorResponse.statusText, url, data)
        } else {
            // we did not receive a response from the server
            this.lastError = {
                method,
                url,
                'statusCode': 0,
                'reason': "Did not receive a response from the server",
                'details': {},
                'response': {},
                'error': error
            }
            throw error;
        }
    }
    // DEPRECATED
    //////////////////////////////////////////////////////////////////////////////////////////





}







//////////////////////////////////////////////////////////////////////////////////////////
// DEPRECATED
export class RelSpec {
    resource: HalResource = {} as HalResource
    rel: string = ''
    parameters?: { [key: string]: any }
    template?: { [key: string]: string }
}
// DEPRECATED
//////////////////////////////////////////////////////////////////////////////////////////
