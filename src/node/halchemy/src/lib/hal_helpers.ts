import {HalResource} from "hal-types";

export function isHalResource(obj: any): obj is HalResource {
    return obj
        && typeof obj === 'object'
        && '_links' in obj
        && 'self' in obj._links
        && typeof obj._links.self === 'object'
        && 'href' in obj._links.self;
}

export function enhanceHalResource(resource: HalResource) {
    (resource as any).hasRel = function (rel: string): boolean {
        return '_links' in this && rel in this._links;
    };

    Object.defineProperty(resource, 'links', {
        get: function () {
            return Object.keys(this._links);
        }
    });

    resource.collection = function*(field: string) {
        if (field in this && Array.isArray(this[field])) {
            for (const item of this[field]) {
                let halResource = item as HalResource;
                enhanceHalResource(halResource)
                yield halResource;
            }
        }
    }
}
