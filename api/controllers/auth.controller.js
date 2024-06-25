import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return next(errorHandler(400, "All fields are required"))
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

export const signin = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"))
  }

  try {
    const validUser = await User.findOne({ email })
    if (!validUser) {
      return next(errorHandler(404, "User Id or email is incorrect"))
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword) {
      return next(errorHandler(400, "User Id or email is incorrect"))
    }
    returnUserWithToken(res, validUser)
  } catch (err) {
    next(err)
  }
}

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      returnUserWithToken(res, user)
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        photoUrl: googlePhotoUrl,
      })

      await newUser.save()
      returnUserWithToken(res, newUser)
    }
  } catch (err) {
    next(err)
  }
}

const returnUserWithToken = (res, user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
  const { password: pass, ...rest } = user._doc
  res.status(200).cookie("access_token", token, { httpOnly: true }).json(rest)
}
