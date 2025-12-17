import { Request } from "express"

class MissingBodyError extends Error {
    constructor() {
        super('Missing request body')
    }
}

const RequestBodyValidator = (req: any, _: any, next: any) => {
    if (!req.body) req.body = null
    next()
}

function requestBody(req: Request) {
    if (!req.body) throw new MissingBodyError()
    return req.body
}

export { MissingBodyError, RequestBodyValidator, requestBody }
