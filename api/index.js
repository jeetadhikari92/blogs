import express from 'express'
import mongoose from 'mongoose'
import dotEnv from 'dotenv'
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"

dotEnv.config()

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected db"))

const app = express()

app.listen(3000, () => {
  console.log("server is running on port 3000")
})

app.use(express.json())
app.use(cookieParser())

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal server error."
  res.status(statusCode).json({
    statusCode,
    success: false,
    message,
  })
})