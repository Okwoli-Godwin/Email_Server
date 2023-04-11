import express, { Request, Response } from "express"
import usermodel from "../model/usermodel"
import crypto from "crypto"
import { verifyAccount } from "../util/email"

export const userregister = async (req: Request, res: Response)=> {
    try {
        const { userName, email, password, token, verified, otp } = req.body
        const getToken = await crypto.randomBytes(32).toString("hex")
        const getOtp = await crypto.randomBytes(2).toString("hex")

        
        
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

export const verifyuser = async (req: Request, res: Response) => {
    try {
        const { otp } = req.body;

        const user = await usermodel.findById(req.params.userId)

         if (user?.otp === otp) {
      if (user?.token !== "") {
        await usermodel.findByIdAndUpdate(
          user?._id,
          {
            token: "",
            verified: true,
          },
          { new: true }
          );
        
          return res.status(201).json({
          message: "Account has been verified, you can now signin",
          //   data: user,
        });
      } else {
        return res.status(400).json({
          message: "you have inputed a wrong otp",
        });
      }
    } else {
      return res.status(400).json({
        message: "you didn't meet the set credentials",
      });
    }
    } catch (error) {
    return res.status(404).json({
      message: "error",
      data: error,
    });
    }
}