export async function streamToString(stream: ReadableStream<Uint8Array>): Promise<string> {
    const reader = stream.getReader();
    let chunks: Uint8Array[] = [];
    let done, value;

    while (!done) {
        ({done, value} = await reader.read());
        if (value) {
            chunks.push(value);
        }
    }

    // Concatenate all Uint8Array chunks into a single Uint8Array
    let combined = new Uint8Array(chunks.reduce((acc, val) => {
        // @ts-ignore
        return acc.concat(Array.from(val));
    }, []));

    // Decode Uint8Array to string
    return new TextDecoder().decode(combined);
}

function isEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) {
        return false;
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
        if (!keys2.includes(key)) return false;
        if (!isEqual(obj1[key], obj2[key])) return false;
    }
    return true;
}

export function compareJsonStrings(jsonStr1: string, jsonStr2: string): boolean {
    try {
        const obj1 = JSON.parse(jsonStr1);
        const obj2 = JSON.parse(jsonStr2);
        return isEqual(obj1, obj2);
    } catch (e) {
        return false;
    }
}