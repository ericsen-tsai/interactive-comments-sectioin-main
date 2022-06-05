import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import _ from "lodash"
import {
  fetchComment,
  fetchComments,
  createComment,
  createReply,
  editComment,
  editReply,
  deleteComment,
  deleteReply,
} from "./commentService"

const initialState = {
  comments: {},
  isLoading: false,
  error: { isError: false, errMsg: "" },
}

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    clearCommentError: (state) => {
      state.error.isError = false
      state.error.errMsg = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          fetchComment.pending,
          fetchComments.pending,
          createComment.pending,
          createReply.pending,
          editComment.pending,
          editReply.pending,
          deleteComment.pending,
          deleteReply.pending
        ),
        (state) => {
          state.isLoading = true
        }
      )
      .addMatcher(fetchComments.fullfilled, (state, action) => {
        state.isLoading = false
        state.comments = _.keyBy(action.payload, "id")
      })
      .addMatcher(
        // When deleting reply is fullfilled there will be action.payload.
        // Because I use put method instead of delete.
        isAnyOf(
          fetchComment.fullfilled,
          createComment.fullfilled,
          createReply.fullfilled,
          editComment.fullfilled,
          editReply.fullfilled,
          deleteReply.fullfilled
        ),
        (state, action) => {
          state.isLoading = false
          state.comments = { ...state, [action.payload.id]: action.payload }
        }
      )
      .addMatcher(deleteComment.fullfilled, (state, action) => {
        state.isLoading = false
        state.comments = _.omit(state, action.payload.id)
      })
      .addMatcher(
        isAnyOf(
          fetchComment.rejected,
          fetchComments.rejected,
          createComment.rejected,
          createReply.rejected,
          editComment.rejected,
          editReply.rejected,
          deleteComment.rejected,
          deleteReply.rejected
        ),
        (state, action) => {
          state.isLoading = false
          state.comments = {}
          state.error.isError = true
          state.error.errMsg = action.payload
        }
      )
  },
})

export const { clearCommentError } = authSlice.actions

export const selectComments = (state) => state.auth.comments
export const selectCommentError = (state) => state.auth.error

export default authSlice.reducer
