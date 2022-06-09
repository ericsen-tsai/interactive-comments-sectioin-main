import React from "react"
import { useSelector, useDispatch } from "react-redux"

import {
  togglePopup,
  clearIntendedDelete,
  selectIntendedDelete,
  selectComments,
} from "../features/comment/commentSlice"
import { deleteComment, deleteReply } from "../features/comment/commentService"
import "./Popup.scss"

const Popup = () => {
  const dispatch = useDispatch()
  const comments = useSelector(selectComments)
  const { commentId, replyId } = useSelector(selectIntendedDelete)

  const handleOnCancel = () => {
    dispatch(togglePopup())
    dispatch(clearIntendedDelete())
  }

  const handleOnDelete = () => {
    console.log(commentId, replyId)
    if (replyId === -1) {
      dispatch(deleteComment({ id: commentId }))
      dispatch(togglePopup())
      dispatch(clearIntendedDelete())
      return
    }

    const comment = { ...comments[commentId] }
    comment.replies = comment.replies.filter((reply) => reply.id !== replyId)
    dispatch(deleteReply(comment))
    dispatch(togglePopup())
    dispatch(clearIntendedDelete())
  }

  return (
    <div className="popup__bg">
      <div className="popup">
        <h3 className="popup__title">Delete comment</h3>
        <p className="popup__description">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="popup__action">
          <button
            className="popup__button popup__button--cancel"
            onClick={() => handleOnCancel()}
          >
            NO, CANCEL
          </button>
          <button
            className="popup__button popup__button--delete"
            onClick={() => handleOnDelete()}
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  )
}

export default Popup
