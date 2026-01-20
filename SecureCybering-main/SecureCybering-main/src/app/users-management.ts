import { Router } from "express"
import expressAsyncHandler from "express-async-handler"
import { requireNonEmptyString, requirePositiveInt, requireValues } from "./validators/parameters"
import { requestBody } from "./validators/request-body"
import { Authentication } from "./middleware/auth"
import { UserService } from "../user"

const router = Router()

router.use(Authentication(['admin']))

router.route("/")
    .get(expressAsyncHandler(async (req, res) => {
        const { offset, limit } = req.query

        const _offset = parseInt(offset as string) || 0
        const _limit = parseInt(limit as string) || 50

        const users = await UserService.findAll(_offset, _limit)
        res.json(users)
    }))
    .post(expressAsyncHandler(async (req, res) => {
        const { name, email, password, role } = requestBody(req)

        requireNonEmptyString('name', name)
        requireNonEmptyString('email', email)
        requireNonEmptyString('password', password)
        requireValues('role', role, ['admin', 'user'])

        const newUser = await UserService.create({ name, email, password, role })
        res.status(201).json(newUser)
    }))

router.route("/:id")
    .get(expressAsyncHandler(async (req, res) => {
        const userId = parseInt(req.params.id) || 0
        const user = await UserService.findById(userId)
        res.json(user)
    }))
    .patch(expressAsyncHandler(async (req, res) => {
        const { name, email, password, role } = req.body

        if (name) requireNonEmptyString('name', name)
        if (email) requireNonEmptyString('email', email)
        if (password) requireNonEmptyString('password', password)
        if (role) requireValues('role', role, ['admin', 'user'])

        const userId = parseInt(req.params.id) || 0
        const user = await UserService.update({ id: userId }, { name, email, password, role })
        res.json(user)
    }))
    .delete(expressAsyncHandler(async (req, res) => {
        const userId = requirePositiveInt('id', req.params.id)
        await UserService.delete({ id: userId })
        res.status(204).send()
    }))

export { router as UserManagement }
