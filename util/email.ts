import nodemailer from "nodemailer"
import { google } from "googleapis"

const GOOGLE_ID: string = "";
const GOOGLE_SECRET: string = "";
const GOOGLE_REFRESHTOKEN: string = "";
const GOOGLE_REDIRECT: string = "";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT)

export const verifyAccount = async () => {
    try {
        oAuth.setCredentials({ access_token: GOOGLE_REFRESHTOKEN })
        
        const getToken: any = oAuth.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAUTH2",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_REFRESHTOKEN,
                accessToken: getToken.token
            }
        })

        const mailOptions = {
            from: "MyMail<OurEmail>",
            to: "sendEmail",
            subject: "Account Verification",
            html: "<div>Welcome</div>"
        }

        transporter
            .sendMail(mailOptions)
            .then(() => {
            console.log("email sent")
            })
            .catch((err) => {
            console.log(err)
        })
    } catch (error) {
        console.log()
    }
}