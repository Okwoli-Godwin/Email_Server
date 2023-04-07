import mongoose from "mongoose";

const LiveURL = "mongodb+srv://Email_Server:Email_Server@cluster0.8usbdhw.mongodb.net/?retryWrites=true&w=majority"

export const dbConnection = async() => {
    try {
        const conn = await mongoose.connect(LiveURL);
        if (
            mongoose.connection.host === "localhost"
        ) {
            console.log("connected to localhost")
        } else (
            console.log("Database is live now")
        )
    } catch (error) {
        console.log("failed to connect to the database")
    }
}