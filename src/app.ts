import "reflect-metadata"
import "express-async-errors"
import express from "express"
import { usersRouter } from "./router/users.route"
import { loginRouter } from "./router/login.route"
import { errorHandler } from "./errors/AppError"



const app = express()
app.use(express.json())
app.use("/users", usersRouter)
app.use("/login", loginRouter)
app.use(errorHandler)


export default app