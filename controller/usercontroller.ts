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

export const requestPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await usermodel.findOne({ email });
        console.log("this is user :", user);
        console.log("this is usertoken", user?.token)
        const token = crypto.randomBytes(32).toString("hex")
        if (user?.token === "" && user?.verified === true) {
            const userData = await usermodel.findByIdAndUpdate(
                user?._id,
                { token: token },
                {new: true}
            )

            return res.status(200).json({
                message: "an email has been on your request",
                data: userData,
                token: token,
                user: user
            })
        } else {
            return res.status(200).json({
                message: "you dont meet the set credentials"
            })
        }
    } catch (error) {
        return res.sendStatus(400).json({
            message: "error"
        })
    }
}



export const changeUserPassword = async (req: Request, res: Response) => {
    try {
           const { password } = req.body;

    const { userId, token } = req.params;

        const user = await usermodel.findById(userId); 
        
        if (user) {
            if (user?.token === "" && user?.verified === true) {
                const theUser = await usermodel.findByIdAndUpdate(
            userId,
            { password, token: "" },
            { new: true }
          );
  
          return res.json({
              message: "Your password has been changed, SUCCESSFULLY!",
              data: theUser,
            }); 
            }
        } else {
        return res.json({ message: "Please just go" });
      }

    } catch (error) {
         return res.status(400).json({
      message: "error",
    });
    }
}