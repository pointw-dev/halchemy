import {Api} from "./api";
import {CaseInsensitiveHeaders} from "./case_insensitive_headers";
import {HalLink, HalResource} from "hal-types";
const  {parse} =  require('./rfc6570');


function quotePlus(s: string): string {
    const safeChars: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-.*";
    const encoder = new TextEncoder();
    return [...s].map(char => {
        if (char === ' ') return '+';
        if (safeChars.includes(char)) return char;
        return [...encoder.encode(char)].map(byte => '%' + byte.toString(16).toUpperCase()).join('');
    }).join('');
}

export class BaseRequester {
    protected _api: Api
    protected _url: string
    protected _data: any = null
    protected _headers: CaseInsensitiveHeaders = new CaseInsensitiveHeaders({})
    protected _resource: HalResource | null = null
    protected _parameters: object = {}
    protected _templateValues: Record<string, string> = {}
    protected _isTemplated: boolean = false

    constructor(api: Api, target: string | {resource: HalResource, rel: string}) {
        this._api = api

        if (typeof(target) === 'string') {
            this._url = target
            return
        }

        const link: HalLink = (target.resource as HalResource)._links[target.rel] as HalLink
        this._url =link.href
        this._isTemplated = link.templated as boolean
        this._resource = target.resource
    }

    withParameters(parameters: object) {
        this._parameters = {
            ...this._parameters,
            ...parameters
        }
        return this
    }

    withHeaders(headers: Record<string, string>) {
        this._headers.update(new CaseInsensitiveHeaders(headers))
        return this
    }

    withTemplateValues(templateValues: Record<string, string>) {
        this._templateValues = {
            ...this._templateValues,
            ...templateValues
        }
        return this
    }

    get url(): string {
        let url = this._url;
        if (this._isTemplated) {
            const template = parse(this._url)
            url = template.expand(this._templateValues || {})
        }

        if (this._parameters) {
            url = this._addParametersToUrl(url);
        }
        return url;
    }

    private _handleArray(key: string, array: any[]): string[] {
        switch (this._api.parametersListStyle) {
            case "repeat_key":
                return array.map(item => `${key}=${quotePlus(item.toString())}`);
            case "bracket":
                return array.map(item => `${key}[]=${quotePlus(item.toString())}`);
            case "index":
                return array.map((item, index) => `${key}[${index}]=${quotePlus(item.toString())}`);
            case "comma":
                return [`${key}=${array.map(item => quotePlus(item.toString())).join(',')}`];
            case "pipe":
                return [`${key}=${array.map(item => quotePlus(item.toString())).join('|')}`];
            default:
                throw new Error(`Unsupported parameters list style: ${this._api.parametersListStyle}`);
        }
    }

    private _flattenParams(prefix: string, params: any): string[] {
        let flattened: string[] = [];
        Object.keys(params).forEach(key => {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            const value = params[key];
            if (value === null) {
                flattened.push(fullKey);
            } else if (Array.isArray(value)) {
                flattened = flattened.concat(this._handleArray(fullKey, value));
            } else if (typeof value === 'object') {
                flattened = flattened.concat(this._flattenParams(fullKey, value));
            } else if (typeof value === 'boolean') {
                flattened.push(`${fullKey}=${value.toString().toLowerCase()}`);
            } else {
                flattened.push(`${fullKey}=${quotePlus(value.toString())}`);
            }
        });
        return flattened;
    }

    //                 url = url.replace(/&$/, '');

    private _addParametersToUrl(url: string): string {
        if (!this._parameters || Object.keys(this._parameters).length === 0) {
            return url;
        }

        const queryParts = this._flattenParams('', this._parameters);
        if (queryParts.length === 0) {
            return url;
        }

        const queryString = queryParts.join('&');
        if (!url.includes('?')) {
            return `${url}?${queryString}`;
        } else {
            const separator = url.endsWith('?') || url.endsWith('&') ? '' : '&';
            return `${url}${separator}${queryString}`;
        }
    }


    protected async _request(method: string) {
        return await this._api.request(method, this.url, this._data, this._headers.toObject())
    }

}


export class ReadOnlyRequester extends BaseRequester {
    async get() {
        return await this._request('GET')
    }

    async head() {
        return await this._request('HEAD')
    }

    async options() {
        return await this._request('OPTIONS')
    }

}


export class Requester extends ReadOnlyRequester {
    async post(data: any = null, contentType: string | null = null) {
        this._prepare_payload(data, contentType);
        return await this._request('POST')
    }

    async put(data: any = null, contentType: string | null = null) {
        this._prepare_payload(data, contentType);
        this._prepare_modify_header();
        return await this._request('PUT')
    }

    async patch(data: any = null, contentType: string | null = null) {
        this._prepare_payload(data, contentType);
        this._prepare_modify_header();
        return await this._request('PATCH')
    }

    async delete() {
        this._prepare_modify_header();
        return await this._request('DELETE')
    }

    private _prepare_payload(data: any, contentType: string | null) {
        this._data = data
        if (contentType) {
            this._headers.set('Content-type', contentType as string)
        }
    }

    private _prepare_modify_header() {
        if (this._resource) {
            this._headers.update(this._api.getOptimisticConcurrencyHeader(this._resource))
        }
    }

}