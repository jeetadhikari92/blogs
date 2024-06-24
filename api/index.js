import express from 'express'
import mongoose from 'mongoose'
import dotEnv from 'dotenv'
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"

dotEnv.config()

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected db"))

const app = express()

app.listen(3000, () => {
  console.log("server is running on port 3000")
})

app.use(express.json())
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)