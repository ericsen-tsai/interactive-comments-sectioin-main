import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"

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
    <motion.div className="popup__bg" exit={{ opacity: 0 }}>
      <motion.div
        className="popup"
        initial={{ x: -200, y: -50, scale: 0.5 }}
        animate={{ x: -200, y: -100, scale: 1 }}
        exit={{ opacity: 0, scale: 0.1 }}
        transition={{ type: "spring", duration: 0.3, bounce: 0.5 }}
      >
        <h3 className="popup__title">Delete comment</h3>
        <p className="popup__description">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="popup__action">
          <button
            className="button button--cancel"
            onClick={() => handleOnCancel()}
          >
            NO, CANCEL
          </button>
          <button
            className="button button--delete"
            onClick={() => handleOnDelete()}
          >
            YES, DELETE
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Popup
