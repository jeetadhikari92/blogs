import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useDispatch, useSelector } from "react-redux"
import {
  signInSuccess,
  signInStart,
  signInFailure,
} from "../redux/user/userSlice"
import { OAuth } from "../components/OAuth"

export const SignIn = () => {
  const [formValue, setFormValue] = useState({})
  const { loading, error: errorMessage } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormValue((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value.trim(),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formValue.email || !formValue.password) {
      return dispatch(signInFailure("Please fill out all fields."))
    }
    try {
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValue),
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure(data.message))
      }
      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate("/")
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Cool
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project, This is a demo project,This is a demo
            project,This is a demo project,This is a demo project,This is a demo
            project,This is a demo project,
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                onChange={handleChange}
                type="email"
                placeholder="example@example.com"
                id="email"
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                onChange={handleChange}
                type="password"
                placeholder="***********"
                id="password"
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-small mt-5">
            <span>Dont have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}
