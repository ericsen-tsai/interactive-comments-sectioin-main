import React from "react"
import { useSelector } from "react-redux"

import { selectComments } from "./commentSlice"
import { selectUser } from "../auth/authSlice"
import CommentCard from "./CommentCard"
import CommentReplyList from "./CommentReplyList"

const CommentList = () => {
  const comments = useSelector(selectComments)
  const user = useSelector(selectUser)
  return (
    <>
      {Object.keys(comments).map((id) => (
        <React.Fragment key={id}>
          <CommentCard comment={comments[id]} currentUserName={user.username} />

          {comments[id].replies.length > 0 && (
            <CommentReplyList
              replies={comments[id].replies}
              currentUserName={user.username}
              commentId={id}
            />
          )}
        </React.Fragment>
      ))}
    </>
  )
}

export default CommentList
