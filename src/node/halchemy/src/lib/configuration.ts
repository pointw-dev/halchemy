import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import {readIniFileSync} from "read-ini-file";
import { fileURLToPath } from "node:url";

const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

// Functions and utilities below are only used when running in Node.
// They are intentionally defined lazily to avoid evaluating Node-specific
// code when this module is bundled for the browser.
function getModuleDir() {
    return typeof __dirname !== 'undefined'
        ? __dirname
        : path.dirname(fileURLToPath(eval('import.meta.url')));
}

function findProjectRoot(currentPath: string): string | undefined {
    const parentDir = path.dirname(currentPath);
    if (parentDir === currentPath) {
        return undefined;
    }

    const potentialNodeModulesPath = path.join(parentDir, 'node_modules');
    if (fs.existsSync(potentialNodeModulesPath)) {
        return parentDir;
    }

    return findProjectRoot(parentDir);
}


export function loadConfig(): any {
    const defaults = {
        halchemy: {
            baseUrl: 'http://localhost:2112',
            parametersListStyle: 'repeat_key',
            etagField: '_etag'
        },
        headers: {
            'Content-type': 'application/json',
            Authorization: 'Basic cm9vdDpwYXNzd29yZA==',
            Accept: 'application/hal+json, application/json;q=0.9, */*;q=0.8'
        },
        errorHandling: {
            raiseForNetworkErrors: true,
            raiseForStatusCodes: null
        }
    };

    if (isBrowser) {
        // Browsers have no access to the filesystem so return defaults only.
        return defaults;
    }

    const configFileName = '.halchemy';
    const moduleDir = getModuleDir();
    const projectRoot = findProjectRoot(moduleDir);
    let config: any = {}

    if (projectRoot) {
        const configPath = path.join(projectRoot, configFileName);
        if (fs.existsSync(configPath)) {
            config = readIniFileSync(configPath)
        }
    }
    if (Object.keys(config).length == 0) {
        const homeDir = os.homedir();
        const configPath = path.join(homeDir, configFileName);
        if (fs.existsSync(configPath)) {
            if (fs.existsSync(configPath)) {
                config = readIniFileSync(configPath)
            }
        }
    }

    let errorHandling = {
        raiseForNetworkErrors: true,
        raiseForStatusCodes: null
    }
    if (config.error_handling) {
        errorHandling = {
            raiseForNetworkErrors: config.error_handling.raise_for_network_errors ?? true,
            raiseForStatusCodes: config.error_handling.raise_for_status_codes ?? null
        }
    }

    return {
        halchemy: {
            baseUrl: config.halchemy?.base_url ?? 'http://localhost:2112',
            parametersListStyle: config.halchemy?.parameters_list_style ?? 'repeat_key',
            etagField: config.halchemy?.etag_field ?? '_etag',
        },
        headers:  {
            'Content-type': 'application/json',
            Authorization: 'Basic cm9vdDpwYXNzd29yZA==',  // root:password
            Accept: 'application/hal+json, application/json;q=0.9, */*;q=0.8',
            ...config.headers ?? {}
        },
        errorHandling
    }
}
