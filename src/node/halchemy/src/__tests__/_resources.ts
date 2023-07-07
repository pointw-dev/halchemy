import {HalResource} from "hal-types";

export const root: HalResource = {
    _links: {
        self: {href: 'http://localhost:2112'},
        relative: {href: '/relative'},
        absolute: {href: 'http://localhost:2112/absolute'},
        templated: {
            href: "http://localhost:2113/catalogs/{id}",
            templated: true
        }
    }
}

export const relative: HalResource = {
    name: 'relative',
    _links: {
        self: {href: '/relative'}
    }
}

export const absolute: HalResource = {
    name: 'absolute',
    _links: {
        self: {href: 'http://localhost:2112/absolute'}
    }
}

export const posted: HalResource =  {
    name: 'My Name',
    _links: {
        self: {
            href: 'http://localhost:2112/catalogs'
        }
    }
}

export const patched: HalResource =  {
    name: 'My Name',
    _links: {
        self: {
            href: 'http://localhost:2112/catalogs'
        }
    },
    _status: 'ok'
}
