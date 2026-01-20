import express, { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = Router()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const uiDir = path.join(__dirname, "../../ui")

router.use("/", express.static(uiDir))

export { router as UI }
