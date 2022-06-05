import { configureStore } from "@reduxjs/toolkit"
import commentReducer from "../features/comment/commentSlice"
import authReducer from "../features/auth/authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comment: commentReducer,
  },
})
