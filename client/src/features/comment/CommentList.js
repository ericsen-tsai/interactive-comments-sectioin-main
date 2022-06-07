import React from "react"
import { useSelector } from "react-redux"

import { selectComments } from "./commentSlice"
import { selectUser } from "../auth/authSlice"
import CommentCard from "./CommentCard"
import ReplyCard from "./ReplyCard"

const CommentList = () => {
  const comments = useSelector(selectComments)
  const user = useSelector(selectUser)
  return (
    <>
      {Object.keys(comments).map((id) => (
        <>
          <div className="commentcard">
            <CommentCard
              comment={comments[id]}
              currentUserName={user.username}
              key={id}
            />

            {/* TODO commentcard reply */}
          </div>

          {comments[id].replies.map((reply) => (
            <div className="replycard">
              <ReplyCard
                reply={reply}
                key={`${reply.createdAt}-${reply.user.username}`}
              />
              {/* TODO replycard reply */}
            </div>
          ))}
        </>
      ))}
    </>
  )
}

export default CommentList
