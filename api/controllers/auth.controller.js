import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"

export const signup = async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    res.status(400).send({ message: "Bad request" })
    return
  }

  const hashedPassword = bcryptjs.hashSync(password, 10)

  const user = new User({ username, email, password: hashedPassword })
  try {
    await user.save()
    res.status(201).json({ message: "User created" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
