import { createSlice } from "@reduxjs/toolkit"
import { fetchCurrentUser } from "./authService"

const initialState = {
  isAuthenticated: false,
  user: {},
  isLoading: false,
  error: { isError: false, errMsg: "" },
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error.isError = false
      state.error.errMsg = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.user = {}
        state.error.isError = true
        state.error.errMsg = "Can't fetch the user"
      })
  },
})

export const { clearAuthError } = authSlice.actions

export const selectUser = (state) => state.auth.user
export const selectAuthError = (state) => state.auth.error

export default authSlice.reducer
