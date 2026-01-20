class ResourceNotFoundError extends Error {
    constructor(message: string, args?: any) {
        if (args) {
            const formatted = Object.entries(args).map(([k, v]) => `${k}: ${v}`).join(', ')
            message += `, args: { ${formatted} }`
        }
        super(message)
    }
}

export { ResourceNotFoundError }