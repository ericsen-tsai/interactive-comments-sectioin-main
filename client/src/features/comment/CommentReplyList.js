import React from "react"
import CommentReplyCard from "./CommentReplyCard"

const CommentReplyList = ({ replies, currentUserName, commentId }) => {
  return (
    <div className="card__reply-list">
      {replies.map((reply) => (
        <CommentReplyCard
          reply={reply}
          currentUserName={currentUserName}
          key={`${reply.createdAt}-${reply.user.username}`}
          commentId={commentId}
        />
      ))}
    </div>
  )
}

export default CommentReplyList
