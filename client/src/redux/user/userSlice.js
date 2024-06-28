import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
      state.error = null
    },
    signInSuccess: (state, { payload }) => {
      state.loading = false
      state.error = null
      state.currentUser = payload
    },
    signInFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
      state.currentUser = null
    },
    updateStart: (state) => {
      state.loading = true
      state.error = null
    },
    updateSuccess: (state, { payload }) => {
      state.loading = false
      state.error = null
      state.currentUser = payload
    },
    updateFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
} = userSlice.actions
export default userSlice.reducer
