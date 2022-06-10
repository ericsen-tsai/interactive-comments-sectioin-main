import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import Card from "../../components/Card"
import UserCard from "./UserCard"
import { createReply } from "./commentService"

const CommentCard = ({ comment, currentUserName }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <AnimatePresence>
        <Card
          info={comment}
          currentUserName={currentUserName}
          setIsOpen={setIsOpen}
          commentId={comment.id}
        />
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <UserCard
            replyingType="comment"
            replyingTo={comment.user.username}
            handleCreate={createReply}
            commentId={comment.id}
            setIsOpen={setIsOpen}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default CommentCard
