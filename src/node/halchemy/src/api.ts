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


export class Api {

    private readonly baseApiUrl: string = 'http://localhost:2112'
    private readonly headers: object = {}
    public lastError: any = {}

    constructor(baseApiUrl: string, auth: string='Basic cm9vdDpwYXNzd29yZA==') {
        this.headers = {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: auth
        }

        axios.defaults.baseURL = baseApiUrl
    }

    urlFromRel({resource, rel, parameters = {}, template = {}}: RelSpec) {
        const link = resource._links[rel] as HalLink
        let url: string = link.href;

        if (link.templated) {
            url = this.fillTemplate(url, template);
        }
        return this.addQueryString(parameters, url);
    }


    async get(url:string = '/'): Promise<{}> {
        try {
            this.lastError = {}
            const response = await axios.get(url, {headers: this.headers})
            return response.data
        } catch (error) {
            this.handleError('GET', error, url)
        }
    }

    async getFromRel({resource, rel, parameters = {}, template = {}}: RelSpec) {
        const url = this.urlFromRel({resource, rel, parameters, template})
        return await this.get(url)
    }


    async getFromRelWithLookup({resource, rel, parameters = {}, template = {}}: RelSpec, lookup: string) {
        const link = resource._links[rel] as HalLink
        let url: string = link.href;

        if (url.charAt(url.length-1) != '/') {
            url += '/'
        }
        url += lookup

        if (link.templated) {
            url = this.fillTemplate(url, template);
        }
        url = this.addQueryString(parameters, url);

        return await this.get(url)
    }


    async postToUrl(url:string, data: {}) {
        try {
            this.lastError = {}
            const response = await axios.post(url, data, {headers: this.headers})
            return response.data
        } catch(error) {
            this.handleError('POST', error, url)
        }
    }


    async postToRel({resource, rel, parameters = {}, template = {}}: RelSpec, data:{}) {
        const url = this.urlFromRel({resource, rel, parameters, template})
        try {
            this.lastError = {}
            const response = await axios.post(url, data, {headers: this.headers})
            return response.data
        } catch(error) {
            this.handleError('POST', error, url)
        }
    }


    async patchResource(resource:HalResource, data:{}) {
        const headers = {
            ...this.headers,
            'If-match': resource._etag
        }
        const url = this.urlFromRel({resource, rel: 'self'})
        try {
            this.lastError = {}
            const response = await axios.patch(url, data, {headers: headers})
            return response.data
        } catch(error) {
            this.handleError('PATCH', error, url)
        }
    }


    async putToRel({resource, rel, parameters = {}, template = {}}: RelSpec, data:{}) {
        const headers = {
            ...this.headers,
            'If-match': resource._etag
        }
        const url = this.urlFromRel({resource, rel, parameters, template})
        try {
            this.lastError = {}
            const response = await axios.put(url, data, {headers: headers})
            return response.data
        } catch(error) {
            this.handleError('PUT', error, url)
        }
    }


    async deleteCollection(url) {
        try {
            this.lastError = {}
            await axios.delete(url, {headers: this.headers})
        } catch(error) {
            this.handleError('DELETE', error, url)
        }
    }


    async deleteResource(resource:HalResource) {
        const headers = {
            ...this.headers,
            'If-match': resource._etag
        }
        const url = this.urlFromRel({resource, rel: 'self'})
        try {
            this.lastError = {}
            await axios.delete(url, {headers: headers})
        } catch(error) {
            this.handleError('DELETE', error, url)
        }
    }





    private addQueryString(parameters: { [p: string]: any }, url: string) {
        const queryString: string = Object.entries(parameters)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');


        return `${url}${queryString ? '?' : ''}${queryString}`;
    }


    private fillTemplate(url: string, template: { [p: string]: string }) {
        const segments: Set<string> = new Set()
        const regex: RegExp = /\{([^}]+)\}/g;
        let match
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

        return url.replace(/\{([^}]+)\}/g, (match, segment) => {
            return template[segment] || match;
        })
    }


    private handleError(method, error, url: string) {
        let errorResponse: any;

        if (error?.isAxiosError && error.hasOwnProperty('response')) {
            // i.e. if we received a response from the server
            const axiosError = error as AxiosError;
            errorResponse = axiosError.response; //all the info here
            this.lastError = errorResponse
            throw new HttpError(`${method} request failed`, errorResponse.status, errorResponse.statusText, url)
        } else {
            // we did not receive a response from the server
            this.lastError = error
            throw error;
        }
    }


}
