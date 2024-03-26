type RangePart = ['range', number, number] | ['gt', number] | ['lt', number] | ['gte', number] | ['lte', number] | ['eq', number]

function parseRangeSetting(settings: string): RangePart[] {
    const parts = settings.replace(',', ' ').split(/\s+/)
    const ranges: RangePart[] = []

    parts.forEach(part => {
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(Number)
            ranges.push(['range', start, end])
        } else if (part.startsWith('>=')) {
            const value = parseInt(part.slice(2), 10)
            ranges.push(['gte', value])
        } else if (part.startsWith('<=')) {
            const value = parseInt(part.slice(2), 10)
            ranges.push(['lte', value])
        } else if (part.startsWith('>')) {
            const value = parseInt(part.slice(1), 10)
            ranges.push(['gt', value])
        } else if (part.startsWith('<')) {
            const value = parseInt(part.slice(1), 10)
            ranges.push(['lt', value])
        } else {
            const value = parseInt(part, 10)
            ranges.push(['eq', value])
        }
    })

    return ranges
}


export function doSettingsIncludeStatusCode(settings: string | null, statusCode: number): boolean {
    if (settings === '' || settings === null) {
        return false
    }

    const rangeSetting = parseRangeSetting(settings as string)

    return rangeSetting.some(([condition, ...values]) => {
        switch (condition) {
            case 'range':
                const value = values[1] === undefined? 100000 : values[1]  // TODO: is there a better way to guard against values[1] being undefined?
                return statusCode >= values[0] && statusCode <= value
            case 'gt':
                return statusCode > values[0]
            case 'lt':
                return statusCode < values[0]
            case 'gte':
                return statusCode >= values[0]
            case 'lte':
                return statusCode <= values[0]
            case 'eq':
                return statusCode === values[0]
            default:
                return false
        }
    })
}
