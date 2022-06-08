import React from "react"
import CommentReplyCard from "./CommentReplyCard"

const CommentReplyList = ({ replies, currentUserName }) => {
  return (
    <div className="card card--reply-list">
      {replies.map((reply) => (
        <CommentReplyCard
          reply={reply}
          currentUserName={currentUserName}
          key={`${reply.createdAt}-${reply.user.username}`}
        />
      ))}
    </div>
  )
}

export default CommentReplyList
