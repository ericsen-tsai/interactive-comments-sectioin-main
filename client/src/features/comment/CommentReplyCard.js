import React, { useState } from "react"
import { AnimatePresence } from "framer-motion"

import Card from "../../components/Card"
import UserCard from "./UserCard"
import { createReply } from "./commentService"

const CommentReplyCard = ({ reply, currentUserName, commentId }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <AnimatePresence>
        <Card
          info={reply}
          currentUserName={currentUserName}
          setIsOpen={setIsOpen}
          commentId={commentId}
        />
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <UserCard
            replyingType="reply"
            replyingTo={reply.user.username}
            handleCreate={createReply}
            commentId={commentId}
            setIsOpen={setIsOpen}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default CommentReplyCard
