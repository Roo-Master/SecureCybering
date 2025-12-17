import { User } from "../../user"
import express from 'express'

declare global {
    namespace Express {
        interface Request {
            authToken: string
            user: User
        }

        interface Response {
            message(message: string): Response<any, Record<string, any>, number>
            data(data: any): Response<any, Record<string, any>, number>
            error(code?: string, message?: string): Response<any, Record<string, any>, number>
        }
    }
}

express.Response.prototype.message = function(message: string) {
    return this.json({ message })
}

express.response.proto

express.Response.prototype.error = function(code?: string, message?: string) {
    return this.json({ error: true, code, message })
}
