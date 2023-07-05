import axios from "axios"

export class Api {

    private readonly baseApiUrl: string = 'http://localhost:2112'
    private headers: object = {}

    constructor(baseApiUrl: string, auth: string='Basic cm9vdDpwYXNzd29yZA==') {
        this.headers = {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: auth
        }

        this.baseApiUrl = baseApiUrl  // TODO: do I need to hold onto this?
        axios.defaults.baseURL = baseApiUrl
    }

    urlFromRel({resource, rel, parameters = {}, template = {}}: {
        resource: object,
        rel: string,
        parameters?: object,
        template?: object
    }) {
        let url = resource._links[rel].href

    }

    async get(url:string = '/'): Promise<{}> {
        const response = await axios.get(url, {headers: this.headers})
        // TODO: handle issues
        return response
    }
}
