import express from "express"
import { configureRouting } from "./routing"

const app = express()

async function startServer(port: number = 8080) {
    configureRouting(app)

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
}

export { startServer }
``