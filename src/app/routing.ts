import express, { Express, Router } from "express"
import { UserManagement } from "./users-management"
import { UserProfileManager } from "./user-profile"
import { UserAuthentication } from "./auth"
import { UI } from "./ui"


function configureRouting(app: Express) {
    app.use("/", UI)

    const api = Router()

    api.get("/", (req, res) => {
        res.send("Hello, Antifraud!")
    })

    api.use("/auth", UserAuthentication)
    
    api.use("/users", UserManagement)
    api.use("/profile", UserProfileManager)

    app.use("/api", api)
}

export { configureRouting }
