import {Api} from "./api";
import {HalResource, HalLink} from "hal-types";
import {Requester} from "./requester";

export class Follower {

    private readonly _api: Api
    private _resource: HalResource

    constructor(api: Api, resource: HalResource) {
        this._api = api
        this._resource = resource
    }

    to(rel: string): Requester {
        if (!(rel in this._resource._links)) {
            throw new Error(`Link relation "${rel}" not found in resource`)
        }
        return new Requester(this._api, {resource: this._resource, rel: rel})
    }
}
