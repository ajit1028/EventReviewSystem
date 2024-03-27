import express from "express"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true, limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import eventRouter from "./routes/event.route.js"

app.use("/api/v1/events",eventRouter)


import userRouter from "./routes/user.route.js"

app.use("/api/v1/users",userRouter)

export default app