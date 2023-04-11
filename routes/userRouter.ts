import express, { Router } from "express"
import { userregister } from "../controller/usercontroller"

const router = Router()

router.post("/iuserregister", userregister)

export default router