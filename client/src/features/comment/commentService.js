import { createAsyncThunk } from "@reduxjs/toolkit"
import API from "../../api"

const headers = {
  "Content-Type": "application/json",
}

export const fetchComment = createAsyncThunk(
  "auth/fetchComment",
  async (data) => {
    const response = await API.get(`comments/${data.id}`, headers)
    return response.data
  }
)

export const fetchComments = createAsyncThunk(
  "auth/fetchComments",
  async () => {
    const response = await API.get("comments", headers)
    return response.data
  }
)

export const createComment = createAsyncThunk(
  "auth/createComment",
  async (data) => {
    const response = await API.post("comments", headers, data)
    return response.data
  }
)

//Creating a reply uses put is because can't call an api to
//add reply directly. (so as editing and deleting)
export const createReply = createAsyncThunk(
  "auth/createReply",
  async (data) => {
    const response = await API.put(`comments/${data.id}`, headers, data)
    return response.data
  }
)

export const editComment = createAsyncThunk(
  "auth/editComment",
  async (data) => {
    const response = await API.put(`comments/${data.id}`, headers, data)
    return response.data
  }
)

export const editReply = createAsyncThunk("auth/editReply", async (data) => {
  const response = await API.put(`comments/${data.id}`, headers, data)
  return response.data
})

export const deleteComment = createAsyncThunk(
  "auth/deleteComment",
  async (data) => {
    await API.delete(`comments/${data.id}`, headers)
  }
)

export const deleteReply = createAsyncThunk(
  "auth/deleteReply",
  async (data) => {
    const response = await API.put(`comments/${data.id}`, headers, data)
    return response.data
  }
)
