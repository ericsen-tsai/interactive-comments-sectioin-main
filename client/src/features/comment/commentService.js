import { createAsyncThunk } from "@reduxjs/toolkit"
import API from "../../api"

const headers = {
  "Content-Type": "application/json",
}

export const fetchComment = createAsyncThunk(
  "comment/fetchComment",
  async (data) => {
    const response = await API.get(`comments/${data.id}`, headers)
    return response.data
  }
)

export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async () => {
    const response = await API.get("comments", headers)
    return response.data
  }
)

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (data) => {
    const response = await API.post("comments", data, { headers })
    return response.data
  }
)

//Creating a reply uses put is because can't call an api to
//add reply directly. (so as editing and deleting)
export const createReply = createAsyncThunk(
  "comment/createReply",
  async (data) => {
    const response = await API.put(`comments/${data.id}`, data, { headers })
    return response.data
  }
)

export const editComment = createAsyncThunk(
  "comment/editComment",
  async (data) => {
    const response = await API.put(`comments/${data.id}`, data, { headers })
    return response.data
  }
)

export const editReply = createAsyncThunk("comment/editReply", async (data) => {
  const response = await API.put(`comments/${data.id}`, data, { headers })
  return response.data
})

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (data) => {
    await API.delete(`comments/${data.id}`, headers)
    return { id: data.id }
  }
)

export const deleteReply = createAsyncThunk(
  "comment/deleteReply",
  async (data) => {
    const response = await API.put(`comments/${data.id}`, data, { headers })
    return response.data
  }
)
