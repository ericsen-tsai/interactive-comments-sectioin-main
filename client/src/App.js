import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { fetchCurrentUser } from "./features/auth/authService"
import { fetchComments, createComment } from "./features/comment/commentService"
import { selectIsOpenPopup } from "./features/comment/commentSlice"

import CommentList from "./features/comment/CommentList"
import UserCard from "./features/comment/UserCard"
import Popup from "./components/Popup"

import "./App.scss"

const App = () => {
  const dispatch = useDispatch()
  const isOpenPopup = useSelector(selectIsOpenPopup)

  useEffect(() => {
    dispatch(fetchComments())
    dispatch(fetchCurrentUser())
  }, [])

  return (
    <div className="App">
      <CommentList />
      <UserCard handleCreate={createComment} />
      {isOpenPopup && <Popup />}
    </div>
  )
}

export default App
