import mongoose from "mongoose"

interface IUser {
    userName: string;
    email: string;
    password: string;
    token: string;
    verified: boolean;
}

interface UserData extends IUser, mongoose.Document{ }

const usermodel = new mongoose.Schema(
    {
        userName: {
            type: String
        },

        email: {
            type: String,
        },

        password: {
            type: String
        },

        token: {
            type: String
        },

        verified: {
            type: Boolean
        }
    },
    {timestamps: true}
)

export default mongoose.model<UserData>("users", usermodel)