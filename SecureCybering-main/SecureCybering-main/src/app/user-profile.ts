import { Router } from "express"
import { Authentication } from "./middleware/auth"
import { requestBody } from "./validators/request-body"
import { requireNonEmptyString } from "./validators/parameters"
import { UserProgileManager } from "../user-profile"

const router = Router()

router.use(Authentication())

router.route("/")
    .get(async (req, res) => {
        const profile = await UserProgileManager.getUserProfile(req.user.id)
        res.json(profile)
    })
    .patch(async (req, res) => {
        
        const { name, email, password } = requestBody(req)

        requireNonEmptyString('name', name)
        requireNonEmptyString('email', email)
        if (password) requireNonEmptyString('password', password)

        const profile = 
            await UserProgileManager.updateUserProfile(req.user.id, { name, email, password })
        res.json(profile)
    })

export { router as UserProfileManager }
