import express, { Router } from "express"
import { userregister, changeUserPassword ,  verifyuser ,requestPassword } from "../controller/usercontroller"

const router = Router()

router.post("/iuserregister", userregister)
router.post("/:userId/verified", verifyuser);
router.post("/reset-password", requestPassword);

router.route("/:userId/:token/reset-password").post(changeUserPassword);
export default router