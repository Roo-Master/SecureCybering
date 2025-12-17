import { NextFunction, Request, Response } from "express"
import type { UserRole } from "../../user/_dao"
import { AuthService } from "../../auth"

const Authentication = function (roles?: UserRole[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).send('Unauthorized').end()
        }

        const user = await AuthService.verifyToken(token)

        if (roles && !roles.includes(user.role)) {
            return res.status(403).message('Access denied').end()
        }

        req.authToken = token
        req.user = user

        next()
    }
}

export { Authentication }
