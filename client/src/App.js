import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

import UserCard from "./features/auth/UserCard"
import { fetchCurrentUser } from "./features/auth/authService"
import { fetchComments } from "./features/comment/commentService"

import "./App.scss"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchComments())
    dispatch(fetchCurrentUser())
  }, [])

  return (
    <div className="App">
      <UserCard />
    </div>
  )
}

export default App
