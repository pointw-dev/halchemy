import {HalResource} from "hal-types";


export class TemplateValuesMissingError extends Error {
    public readonly missingValuesFor?: string[]
    constructor (message: string, missingValuesFor?: string[]) {
        super(message)
        this.missingValuesFor = missingValuesFor
    }
}

export class HttpError extends Error {
    public readonly status: number
    public readonly reason: string
    public readonly url: string
    public readonly data?: {}

    constructor (message: string, status: number, reason: string, url: string, data?: {} ) {
        super(message)
        this.status = status
        this.reason = reason
        this.url = url
        this.data = data
    }
}

