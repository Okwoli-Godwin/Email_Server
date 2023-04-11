import nodemailer from "nodemailer"
import { google } from "googleapis"

const GOOGLE_ID: string = "1008024411990-3hl9ed3v8bmdvh9706h81178ret30mpi.apps.googleusercontent.com";
const GOOGLE_SECRET: string = "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";
const GOOGLE_REFRESHTOKEN: string = "1//04JWXUxOMgmMcCgYIARAAGAQSNwF-L9IrG_08kawbfgJ-3nTJuK2H5kfsaCoQ-h0fQxjxp2m6df6e4Mic0yZyJs6Qk8dGG0wyDvw";
const GOOGLE_REDIRECT: string = "https://developers.google.com/oauthplayground/";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT)

export const verifyAccount = async (user: any) => {
    try {
        oAuth.setCredentials({ access_token: GOOGLE_REFRESHTOKEN })
        
        const getToken: any = oAuth.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAUTH2",
                user: "okwolig60@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_REFRESHTOKEN,
                accessToken: "ya29.a0Ael9sCMVmDHO0AksTvP0kHRQnp4jcy2IeYM2rO50QFcF7O4eIMLUyWqbaZhkN5J3CjPzfxWbt805AWoUEgkw69-KWJJHOjU_MPi9vEY51gTurTayXtFr0eZtjPp3IOdv0PeLb8-BYiq4bg4nnAiiCGUpCKHKaCgYKAf4SARISFQF4udJh5lHKvTa9LURx0Vvfo1Vjww0163"
            }
        })

        const mailerOption = {
      from: "Easy Pay💰💸 <okwolig60@gmail.com@gmail.com>",
      to: user.email,
      subject: "Account verification",
      html: `<div>Welcome ${user.userName} 
      <a href="http://localhost:3111/api/user/${user._id}/verified">verified</a>
      <br/>
      <br/>
      ${user.otp}
        </div>`,
    };
        transporter
            .sendMail(mailerOption)
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

export const resetPassword = async (user: any) => {
    try {
        oAuth.setCredentials({ access_token: GOOGLE_REFRESHTOKEN })
        const getToken: any = (await oAuth.getAccessToken()).token;

        const transporter = nodemailer.createTransport({
            service: "gmail",

            auth: {
                type: "OAuth2",
                user: "okwolig60@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_REFRESHTOKEN,
                accessToken:
                "ya29.a0Ael9sCMVmDHO0AksTvP0kHRQnp4jcy2IeYM2rO50QFcF7O4eIMLUyWqbaZhkN5J3CjPzfxWbt805AWoUEgkw69-KWJJHOjU_MPi9vEY51gTurTayXtFr0eZtjPp3IOdv0PeLb8-BYiq4bg4nnAiiCGUpCKHKaCgYKAf4SARISFQF4udJh5lHKvTa9LURx0Vvfo1Vjww0163"
            }
        })

        const mailerOption = {
            from: "Easyhr <okwolig60@gmail.com>",
            to: user.email,
            subject: "Reset password Request",
            html: `<div>Welcome ${user.userName}
             <a href="http://localhost:3111/api/user/${user._id}/${user.token}/reset-password">verified</a>
            <br/>
            <br/>
            ${user.OTP}
            </div>`,
        }

        transporter
      .sendMail(mailerOption)
      .then(() => {
        console.log("Email Send");
      })
      .catch((err) => {
        console.log(err);
      });
    } catch (error) {
        console.log(error)
    }
}