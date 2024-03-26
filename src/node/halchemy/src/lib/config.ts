import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import {readIniFileSync} from "read-ini-file";


function findProjectRoot(currentPath: string = __dirname): string | undefined {
    // This function recursively searches for a directory containing `node_modules`
    // and returns the path of its parent directory (the project root).
    const parentDir = path.dirname(currentPath);

    if (parentDir === currentPath) {
        // Root directory reached without finding `node_modules`
        return undefined;
    }

    const potentialNodeModulesPath = path.join(parentDir, 'node_modules');
    if (fs.existsSync(potentialNodeModulesPath)) {
        // `node_modules` found, return the parent directory
        return parentDir;
    }

    // Recurse up the directory tree
    return findProjectRoot(parentDir);
}


export function loadConfig(): any {
    const configFileName = '.halchemy.ini';
    const projectRoot = findProjectRoot();
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
        baseApiUrl: config.base_api_url ?? 'http://localhost:2112',
        parametersListStyle: config.parameters_list_style ?? 'repeat_key',
        etagField: config.etag_field ?? '_etag',
        headers:  {
            'Content-type': 'application/json',
            Authorization: 'Basic cm9vdDpwYXNzd29yZA==',  // root:password
            Accept: 'application/hal+json, application/json;q=0.9, */*;q=0.8',
            ...config.headers ?? {}
        },
        errorHandling
    }
}
