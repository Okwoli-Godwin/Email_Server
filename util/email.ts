import nodemailer from "nodemailer"
import { google } from "googleapis"

const GOOGLE_ID: string = "1008024411990-3hl9ed3v8bmdvh9706h81178ret30mpi.apps.googleusercontent.com";
const GOOGLE_SECRET: string = "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";
const GOOGLE_REFRESHTOKEN: string = "ya29.a0Ael9sCM7AziXiNhmk3Fq3rS9DLdhlgE12a6cyhGPNzaqFHeR5Zsxxl1yhp1YH3sKTKmXyoJe4Qiz1hrss5yYWLLERXngVV6T3wYDDufVzCjj84xk9_ul4Ab1QOpDJ4IqyQ_r9wyGCPsn4qVUggdqXkzWdV2TaCgYKARcSARISFQF4udJh2ZpV4JLnSP8OIlOZ70xXTQ0163";
const GOOGLE_REDIRECT: string = "https://developers.google.com/oauthplayground/";

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