import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"

import { selectUser } from "../auth/authSlice"
import { selectComments } from "./commentSlice"
import "./UserCard.scss"

const UserCard = ({
  replyingType,
  replyingTo,
  commentId,
  handleCreate,
  setIsOpen,
}) => {
  const [messageContent, setMessageContent] = useState(
    replyingTo ? `@${replyingTo}, ` : ""
  )

  const user = useSelector(selectUser)
  const comments = useSelector(selectComments)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    let messageToAdd
    if (commentId) {
      const replyToAdd = {
        id: Math.floor(Math.random() * 1000000),
        content: messageContent.split(`${replyingTo}, `)[1],
        createdAt: new Date().toISOString(),
        score: 0,
        user,
        replyingTo,
      }
      messageToAdd = { ...comments[commentId] }
      messageToAdd.replies = [...messageToAdd.replies, replyToAdd]
    }

    if (!commentId) {
      messageToAdd = {
        content: messageContent,
        createdAt: new Date().toISOString(),
        score: 0,
        user,
        replies: [],
      }
    }

    dispatch(handleCreate(messageToAdd))

    setMessageContent(replyingTo ? `@${replyingTo}, ` : "")
    if (setIsOpen) setIsOpen(false)
  }

  if (!Object.keys(user).length) return <div>No User!!</div>

  return (
    <motion.div
      className={`usercard ${
        replyingType === "reply" ? "usercard--replying" : ""
      }`}
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3, bounce: 0.3, type: "spring" }}
    >
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
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Add a comment..."
        ></textarea>
        <button className="button">{replyingType ? "REPLY" : "SEND"}</button>
      </form>
    </motion.div>
  )
}

export default UserCard
