import { createAsyncThunk } from "@reduxjs/toolkit"
import API from "../../api"

const headers = {
  "Content-Type": "application/json",
}
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async () => {
    const response = await API.get(
      "currentUser",
      {
        withCredentials: true,
      },
      headers
    )
    return response.data
  }
)
