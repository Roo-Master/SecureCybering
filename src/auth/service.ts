import { jwtVerify, SignJWT } from "jose"
import { User, UserService } from "../user"
import { AuthToken } from "./token"
import { AuthError } from "./auth-error"
import { Settings } from "../settings"
import { AuthSettings } from "./_settings"

class AuthService {

    private async sign(user: User, expiary: number): Promise<string> {
        const payload = {
            id: user.id,
            role: user.role
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET)

        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime(expiary)
            .sign(secret)

        return token
    }

    async authenticate(email: string, password: string): Promise<AuthToken> {
        const user = await UserService.findByEmail(email)
        if (user && password == await UserService.getPassword(user.id)) {
            const expiry = Date.now() / 1000 + await Settings.get(AuthSettings.tokenValidity)
            const token = await this.sign(user, expiry)
            return { token: token, expiry }
        } else throw new AuthError("Invalid email or password")
    }

    async verifyToken(token: string): Promise<User> {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET)

            const { payload } = await jwtVerify(token, secret)

            const user = await UserService.findById(payload.id as number)
            if (!user) throw new AuthError("Invalid token")

            return user
        } catch (e) {
            throw new AuthError("Invalid token")
        }
    }

    async refreshToken(token: string): Promise<AuthToken> {
        const user = await this.verifyToken(token)
        const expiry = Date.now() / 1000 + await Settings.get(AuthSettings.tokenValidity)
        const newToken = await this.sign(user, expiry)
        return { token: newToken, expiry }
    }

}

const service = new AuthService()

export { service as AuthService }
