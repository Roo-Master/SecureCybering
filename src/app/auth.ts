import { Router } from 'express'
import { requireNonEmptyString } from './validators/parameters'
import { requestBody } from './validators/request-body'
import { AuthService } from '../auth'
import { Authentication } from './middleware/auth'

const router = Router()

router.post('/token', async (req, res) => {
    const { email, password } = requestBody(req)

    requireNonEmptyString('email', email)
    requireNonEmptyString('password', password)

    const token = await AuthService.authenticate(email, password)
    res.json(token)
})

router.post("/token/refresh", Authentication(), async (req, res) => {
    const token = req.authToken

    requireNonEmptyString('token', token)

    const newToken = await AuthService.refreshToken(token)
    res.json(newToken)
})

export { router as UserAuthentication }
