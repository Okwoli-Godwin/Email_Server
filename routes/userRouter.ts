import express, { Router } from "express"
import { userregister, verifyuser } from "../controller/usercontroller"

const router = Router()

router.post("/iuserregister", userregister)
router.post("/:userId/verified", verifyuser);

export default router