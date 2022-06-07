import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { selectUser } from "./authSlice"
import { createComment } from "../comment/commentService"
import "./UserCard.scss"

const UserCard = () => {
  const [commentContent, setCommentContent] = useState("")
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const commentToAdd = {
      content: commentContent,
      createdAt: new Date().toISOString(),
      score: 0,
      user,
      replies: [],
    }

    dispatch(createComment(commentToAdd))
    setCommentContent("")
  }

  if (!Object.keys(user).length) return <div>No User!!</div>

  return (
    <div className="usercard">
      <form className="usercard__form" onSubmit={(e) => handleSubmit(e)}>
        <div className="usercard__avatar-box">
          <img
            src={user.image.png}
            alt="user-avatar"
            className="usercard__avatar"
          />
        </div>
        <textarea
          type="text"
          className="usercard__comment"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Add a comment..."
        />
        <button className="usercard__submit">SEND</button>
      </form>
    </div>
  )
}

export default UserCard
