import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Alert, Button, TextInput } from "flowbite-react"
import { useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { app } from "../firebase"
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice"

const DashProfile = () => {
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)
  const { currentUser } = useSelector((state) => state.user)
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
  const [formData, setFormData] = useState({})
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null)
  const filePickerRef = useRef()

  useEffect(() => {
    setUpdateUserSuccess(null)
  }, [formData])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  }

  useEffect(() => {
    if (imageFile) {
      uploadImage()
    }
  }, [imageFile])

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    dispatch(updateStart())
    setUpdateUserSuccess(null)
    if (Object.keys(formData).length === 0) {
      return
    }
    if (imageFileUploading) {
      return
    }
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()
      if (!res.ok) {
        dispatch(updateFailure(data.message))
      } else {
        dispatch(updateSuccess(data))
        setUpdateUserSuccess("User profile is updated successfully.")
      }
    } catch (err) {
      dispatch(updateFailure(err))
    }
  }

  const uploadImage = async () => {
    setImageFileUploading(true)
    setImageFileUploadError(null)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + imageFile.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

        setImageFileUploadProgress(progress.toFixed(0))
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        )
        setImageFileUploadProgress(null)
        setImageFile(null)
        setImageFileUrl(null)
        setImageFileUploading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL)
          setFormData({ ...formData, photoUrl: downloadURL })
          setImageFileUploading(false)
        })
      }
    )
  }

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          ref={filePickerRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.photoUrl}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          onChange={handleFormChange}
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          onChange={handleFormChange}
          type="email"
          id="email"
          placeholder="email@email.com"
          defaultValue={currentUser.email}
        />
        <TextInput
          onChange={handleFormChange}
          type="password"
          id="password"
          placeholder="password"
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={imageFileUploading}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {userState.error && (
        <Alert color="failure" className="mt-5">
          {userState.error}
        </Alert>
      )}
    </div>
  )
}

export default DashProfile
