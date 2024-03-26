import {doSettingsIncludeStatusCode} from "./status_codes";

export class HalchemyMetadata {
    public request: any
    public response: any
    public error: any

    constructor(request: any, response: any, error: any) {
        this.request = request
        this.response = response
        this.error = error
    }

    public raiseForStatusCodes(settings: string = '>399') {
        const statusCode = this.response.statusCode
        const shouldThrow = doSettingsIncludeStatusCode(settings, statusCode)
        if (shouldThrow) {
            throw this
        }
    }
}