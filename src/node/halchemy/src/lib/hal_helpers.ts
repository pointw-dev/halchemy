import {HalResource} from "hal-types";

export function isHalResource(obj: any): obj is HalResource {
    return obj
        && typeof obj === 'object'
        && '_links' in obj
        && 'self' in obj._links
        && typeof obj._links.self === 'object'
        && 'href' in obj._links.self;
}

export const Multiplicity = {
    ONE: 'one',
    MANY: 'many'
} as const;

export function enhanceHalResource(resource: HalResource) {
    (resource as any).hasRel = function (rel: string): boolean {
        return '_links' in this && rel in this._links;
    };

    Object.defineProperty(resource, 'links', {
        get: function () {
            return Object.keys(this._links);
        }
    });

    (resource as any).embeddedRels = function (): string[] {
        return this._embedded ? Object.keys(this._embedded) : [];
    };

    (resource as any).embedded = function (rel: string, options?: { expect?: 'one' | 'many' }) {
        const val = this._embedded?.[rel];
        if (!val) {
            throw new Error(`No embedded resource found for rel '${rel}'`);
        }

        const expect = options?.expect;

        if (expect === Multiplicity.MANY) {
            if (!Array.isArray(val)) {
                throw new TypeError(`Expected array for rel '${rel}', got ${typeof val}`);
            }
            return val.map(item => {
                if (!isHalResource(item)) {
                    throw new TypeError(`Expected HAL resource in array for rel '${rel}'`);
                }
                enhanceHalResource(item);
                return item;
            });
        }

        if (expect === Multiplicity.ONE) {
            if (typeof val !== 'object' || Array.isArray(val)) {
                throw new TypeError(`Expected object for rel '${rel}', got ${typeof val}`);
            }
            if (!isHalResource(val)) {
                throw new TypeError(`Expected HAL resource for rel '${rel}'`);
            }
            enhanceHalResource(val);
            return val;
        }

        // If no expectation, try to infer
        if (Array.isArray(val)) {
            return val.map(item => {
                if (!isHalResource(item)) {
                    throw new TypeError(`Expected HAL resource in array for rel '${rel}'`);
                }
                enhanceHalResource(item);
                return item;
            });
        } else if (typeof val === 'object') {
            if (!isHalResource(val)) {
                throw new TypeError(`Expected HAL resource for rel '${rel}'`);
            }
            enhanceHalResource(val);
            return val;
        }

        throw new TypeError(`Invalid embedded value for rel '${rel}': expected object or array, got ${typeof val}`);
    };

    (resource as any).embeddedMany = function (rel: string) {
        return this.embedded(rel, { expect: Multiplicity.MANY });
    };

    (resource as any).embeddedOne = function (rel: string) {
        return this.embedded(rel, { expect: Multiplicity.ONE });
    };

    resource.collection = function*(field: string) {
        if (!(field in this)) {
            throw new Error(`Field '${field}' does not exist, so cannot be iterated as a collection`);
        }
        if (!Array.isArray(this[field])) {
            throw new Error(`Field '${field}' is not a collection`);
        }

        for (const item of this[field]) {
            if (!isHalResource(item)) {
                throw new Error(`The '${field}' collection contains non-HAL formatted objects`);
            }
            let halResource = item as HalResource;
            enhanceHalResource(halResource);
            yield halResource;
        }
    }
}
