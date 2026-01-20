class IllegalArgumentError extends Error {
    parameterName: string

    constructor(parameterName: string, message: string) {
        super(message)
        this.parameterName = parameterName
    }
}

function requireParam(name: string, value: any, message?: string): any {
    if (value == undefined) {
        throw new IllegalArgumentError(name, message || `Missing required parameter: ${name}`)
    }
    return value
}

function requireNonEmptyString(name: string, value: any, message?: string): string {
    requireParam(name, value)
    if (typeof value !== 'string' || value.trim() === '') {
        throw new IllegalArgumentError(
            name, 
            message || `Invalid parameter value, ${name} must be a non-empty string`
        )
    }
    return value as string
}

function requireInt(name: string, value: any, message?: string): number {
    requireParam(name, value)
    if (!Number.isInteger(parseInt(value))) {
        throw new IllegalArgumentError(
            name, 
            message || `Invalid parameter value, ${name} must be an integer`
        )
    }
    return value as number
}

function requirePositiveInt(name: string, value: any, message?: string): number {
    requireInt(name, value)
    if (value < 0) {
        throw new IllegalArgumentError(
            name, 
            message || `Invalid parameter value, ${name} must be a non-negative integer`
        )
    }
    return value as number
}

function requireValues(name: string, value: any, values: any[], message?: string): any {
    requireParam(name, value)
    if (!values.includes(value)) {
        throw new IllegalArgumentError(
            name, 
            message || `Invalid parameter value, ${name} ` +
                `must be one of the following: ${values.join(', ')}`
        )
    }
    return value
}

export {
    IllegalArgumentError, 
    requireParam, requireNonEmptyString, 
    requireInt, requirePositiveInt, requireValues
}
