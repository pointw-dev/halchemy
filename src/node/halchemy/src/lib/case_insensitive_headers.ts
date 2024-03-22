export class CaseInsensitiveHeaders {
    private headers: Map<string, string>;

    constructor(initialHeaders?: Record<string, string>) {
        this.headers = new Map<string, string>();

        if (initialHeaders) {
            for (const key of Object.keys(initialHeaders)) {
                this.set(key, initialHeaders[key]);
            }
        }
    }

    get(key: string): string | undefined {
        return this.headers.get(key.toLowerCase());
    }

    set(key: string, value: string): void {
        this.headers.set(key.toLowerCase(), value);
    }

    has(key: string): boolean {
        return this.headers.has(key.toLowerCase());
    }

    update(other: CaseInsensitiveHeaders): void {
        for (const [key, value] of other.headers) {
            this.set(key, value);
        }
    }

    delete(key: string): boolean {
        return this.headers.delete(key.toLowerCase());
    }

    toObject(): Record<string, string> {
        const object: Record<string, string> = {};
        for (const [key, value] of this.headers) {
            object[key] = value;
        }
        return object;
    }
}
