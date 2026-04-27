import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()


//=======================  these are basically configurations we need to do for the incoming data ================================
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : "16kb"}))//to limit your data so that your server does not crashes (from specifically a form )

app.use(express.urlencoded({extended : true , limit : "16kb"}))//basically for treating data from a url(data from url causes problem)

app.use(express.static("../public"))

app.use(cookieParser())//for setting and accessing the cookie from server to users browser
//===================================================================================================

export { app }