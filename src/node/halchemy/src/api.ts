import axios, {AxiosError} from "axios"
import {HalLink, HalResource} from "hal-types";
import {TemplateValuesMissingError, HttpError} from './errors'
export {TemplateValuesMissingError, HttpError} from './errors'

export class RelSpec {
    resource: HalResource
    rel: string
    parameters?: { [key: string]: any }
    template?: { [key: string]: string }
}

function isHalResource(obj: any): obj is HalResource {
    return obj
        && typeof obj === 'object'
        && '_links' in obj
        && 'self' in obj._links
        && typeof obj._links.self === 'object'
        && 'href' in obj._links.self;
}


export class Api {

    private readonly headers: object = {}
    public lastError: any = {}

    constructor(baseApiUrl: string, headers = {}) {
        this.headers = {
            'Content-type': 'application/json',
            Authorization: 'Basic cm9vdDpwYXNzd29yZA==',  // root:password
            ...headers
        }

        axios.defaults.baseURL = baseApiUrl
    }

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
            this.handleError('GET', error, url)
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
        let match: string[]
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


    private handleError(method: string, error: AxiosError<unknown, any>, url: string) {
        let errorResponse: any;

        if (error?.isAxiosError && error.hasOwnProperty('response')) {
            // i.e. if we received a response from the server
            const axiosError = error as AxiosError;
            errorResponse = axiosError.response; //all the info here
            const data = errorResponse.hasOwnProperty('data')? errorResponse.data : null
            this.lastError = errorResponse
            throw new HttpError(`${method} request failed`, errorResponse.status, errorResponse.statusText, url, data)
        } else {
            // we did not receive a response from the server
            this.lastError = error
            throw error;
        }
    }

}
