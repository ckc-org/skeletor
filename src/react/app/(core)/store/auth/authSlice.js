import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = null
    },
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setAuthError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setUser, clearUser, setAuthLoading, setAuthError } = authSlice.actions

export default authSlice.reducer
