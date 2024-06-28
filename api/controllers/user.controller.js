import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"
import User from "../models/user.model.js"

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "You are not allowed to update this user"))
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(401, "Password should be atleast 6 characters long")
      )
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10)
  }
  if (req.body.username) {
    if (req.body.username.length < 3 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 3 and 20 characters")
      )
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"))
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"))
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      )
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          photoUrl: req.body.photoUrl,
          password: req.body.password,
        },
      },
      { new: true }
    )
    const { password: pass, ...rest } = updatedUser._doc
    res.status(200).json(rest)
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (req, res, next) => {
  if (req.params.userId !== req.user._id) {
    return next(errorHandler(401, "You are not authorised to delete this user"))
  }
  try {
    await User.findByIdAndDelete(req.params.userId)
    res.status(200).json("User has been deleted")
  } catch (err) {
    next(err)
  }
}