import React, { useState } from "react"
import Card from "../../components/Card"
import UserCard from "./UserCard"
import { createReply } from "./commentService"

const CommentCard = ({ comment, currentUserName }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Card
        info={comment}
        currentUserName={currentUserName}
        setIsOpen={setIsOpen}
        commentId={comment.id}
      />
      {isOpen && (
        <UserCard
          replyingType="comment"
          replyingTo={comment.user.username}
          handleCreate={createReply}
          commentId={comment.id}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  )
}

export default CommentCard
