import express, {Application} from "express"
import { appConfig } from "./app";
import { dbConnection } from "./config/db";

const app: Application = express();

appConfig(app)
dbConnection()

const server = app.listen(2023, () => { 
    console.log("Server is up and running")
})

process.on("unhandledRejection", (err: any) => { 
    console.log("Server is shutting down")

    console.log("server closed")

    server.close(
        process.exit()
    )
})