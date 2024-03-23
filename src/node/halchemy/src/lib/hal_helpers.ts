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
        if (!(field in this)) {
            throw new Error(`Field '${field}' does not exist, so cannot be iterated as a collection`);
        }
        if (!Array.isArray(this[field])) {
            throw new Error(`Field '${field}' is not a collection`);
        }
        try {
            for (const item of this[field]) {
                let halResource = item as HalResource;
                enhanceHalResource(halResource)
                yield halResource;
            }
        } catch (e) {
            throw new Error(`The '${field}' collection contains non-HAL formatted objects`);
        }
    }
}
