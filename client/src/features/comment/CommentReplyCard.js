import React, { useState } from "react"
import Card from "../../components/Card"
import UserCard from "./UserCard"
import { createReply } from "./commentService"

const CommentReplyCard = ({ reply, currentUserName, commentId }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Card
        info={reply}
        currentUserName={currentUserName}
        setIsOpen={setIsOpen}
        commentId={commentId}
      />
      {isOpen && (
        <UserCard
          replyingType="reply"
          replyingTo={reply.user.username}
          handleCreate={createReply}
          commentId={commentId}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  )
}

export default CommentReplyCard
