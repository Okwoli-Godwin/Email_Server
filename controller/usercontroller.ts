import express, { Request, Response } from "express"
import usermodel from "../model/usermodel"

export const userregister = (req: Request, res: Response)=> {
    try {
        const { userName, email, password, token, verified } = req.body
        
        const user = usermodel.create({
            userName,
            email,
            password,
            token,
            verified
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