import express from 'express'
import mongoose from 'mongoose'
import dotEnv from 'dotenv'

dotEnv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected db'))

const app = express()

app.listen(3000, () => {
    console.log('server is running on port 3000')
})