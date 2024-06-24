import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    next(errorHandler(400, "All fields are required"))
    return
  }

  const hashedPassword = bcryptjs.hashSync(password, 10)

  const user = new User({ username, email, password: hashedPassword })
  try {
    await user.save()
    res.status(201).json({ message: "User created" })
  } catch (err) {
    next(err)
  }
}
