import { NextFunction, Request, Response } from "express"
import { IllegalArgumentError } from "../validators/parameters"
import { MissingBodyError } from "../validators/request-body"
import { ResourceNotFoundError } from "../../errors"
import { AuthError } from "../../auth"

const ErrorHandler = (e: any, req: Request, res: Response, next: NextFunction) => {
    function error(
        status: number = 500,
        code?: string,
        message: string = "Internal Server Error",
        payload: { [key: string]: any } = {}
    ) {
        return res.status(status).json({ error: true, code, message, ...payload })
    }

    switch (true) {
        case e instanceof MissingBodyError:
            return error(400, undefined, 'Missing request body')
        case e instanceof IllegalArgumentError:
            return error(400, 'InvalidParameter', e.message, { param: e.parameterName })
        case e instanceof AuthError: 
            return error(401, 'Unauthorized', e.message)
        case e instanceof ResourceNotFoundError:
            return error(404, 'NotFound', e.message)
        default:
            console.error(e)
            return error()
    }
}

export default ErrorHandler
