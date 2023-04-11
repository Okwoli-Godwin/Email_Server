import express, { Request, Response } from "express"
import usermodel from "../model/usermodel"
import crypto from "crypto"
import { verifyAccount } from "../util/email"

export const userregister = async (req: Request, res: Response)=> {
    try {
        const { userName, email, password, token, verified, otp } = req.body
        const getToken = await crypto.randomBytes(32)
        const getOtp = await crypto.randomBytes(2)

        
        
        const user = await usermodel.create({
            userName,
            email,
            password,
            token: getToken,
            verified,
            otp: getOtp
        })

        verifyAccount(user)
            .then((res) => {
                console.log("email server is created")
            })
            .catch((res) => {
            console.log("An error occured")
        })
        

        return res.status(200).json({
            message: "User created successfully",
            data: user
        })
    } catch (error) {
        return res.status(400).json({
            message: "An error occured",
            data: error
        })
    }
}