import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { selectUser } from "../auth/authSlice"
import { createComment } from "./commentService"
import "./UserCard.scss"

const UserCard = ({ replying }) => {
  const [commentContent, setCommentContent] = useState("")
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    // const commentToAdd = {
    //   content: commentContent,
    //   createdAt: new Date().toISOString(),
    //   score: 0,
    //   user,
    //   replies: [],
    // }
    // TODO dispatch with different logic based on different card types
    // dispatch(createComment(commentToAdd))
    setCommentContent("")
  }

  if (!Object.keys(user).length) return <div>No User!!</div>

  return (
    <div className={`usercard ${replying ? "usercard--replying" : ""}`}>
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
