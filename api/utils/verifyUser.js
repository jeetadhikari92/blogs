import jwt from "jsonwebtoken"
import { errorHandler } from "./error.js"

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) {
    return next(errorHandler(401, "Unauthorised User"))
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    debugger
    if (err) {
      return next(errorHandler(401, "Unauthorised User"))
    }
    req.user = user
    next()
  })
}
