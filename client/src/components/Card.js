import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { AnimatePresence, motion } from "framer-motion"

import {
  togglePopup,
  chooseIntendedDelete,
  selectComments,
} from "../features/comment/commentSlice"
import { editComment, editReply } from "../features/comment/commentService"

import "./Card.scss"

const Card = ({ info, currentUserName, setIsOpen, commentId }) => {
  const { content, createdAt, score, user, replyingTo, id } = info
  const [isEdit, setIsEdit] = useState(false)
  const [messageContent, setMessageContent] = useState(
    replyingTo ? `@${replyingTo}, ${content}` : content
  )

  const dispatch = useDispatch()
  const comments = useSelector(selectComments)

  const isSelf = currentUserName === user.username

  const handleOnDelete = () => {
    dispatch(togglePopup())
    dispatch(
      chooseIntendedDelete({
        commentId: Number(commentId),
        replyId: replyingTo ? id : -1,
      })
    )
  }

  const handleScore = (num) => {
    let commentToAdd = { ...comments[commentId] }
    if (replyingTo) {
      dispatch(
        editReply({
          ...commentToAdd,
          replies: commentToAdd.replies.map((reply) => {
            if (reply.id === id) {
              return { ...reply, score: reply.score + num }
            }
            return reply
          }),
        })
      )
      return
    }

    dispatch(
      editComment({ ...commentToAdd, score: (commentToAdd.score += num) })
    )
  }

  const handleEdit = () => {
    let commentToAdd = { ...comments[commentId] }
    if (replyingTo) {
      dispatch(
        editReply({
          ...commentToAdd,
          replies: commentToAdd.replies.map((reply) => {
            if (reply.id === id) {
              return {
                ...reply,
                content: messageContent.split(`${replyingTo}, `)[1],
              }
            }
            return reply
          }),
        })
      )
    }

    if (!replyingTo)
      dispatch(editComment({ ...commentToAdd, content: messageContent }))
  }

  useEffect(() => {
    setIsEdit(false)
  }, [content])

  useEffect(() => {
    if (!isEdit) {
      setMessageContent(replyingTo ? `@${replyingTo}, ${content}` : content)
    }
  }, [isEdit])
  return (
    <motion.div
      className={`card ${replyingTo ? "card--reply" : ""}`}
      style={isEdit ? { paddingBottom: "10rem" } : {}}
      initial={{
        opacity: 0,
        y: 100,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{ duration: 0.5, bounce: 0.5, type: "spring" }}
    >
      <div className="card__comment">
        <div className="card__score-box">
          <i className="icon icon--plus" onClick={() => handleScore(1)}></i>
          <p className="card__score">{score}</p>
          <i className="icon icon--minus" onClick={() => handleScore(-1)}></i>
        </div>
        <div className="card__main">
          <div className="card__main-top">
            <div className="card__info">
              <div className="card__avatar-box">
                <img
                  src={user.image.png}
                  alt={user.username}
                  className="card__avatar"
                />
              </div>
              <p className="card__username">{user.username}</p>
              {isSelf && <p className="card__self-tag">you</p>}
              <p className="card__datetimefromnow">
                {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
              </p>
            </div>
            <div className="card__action-box">
              {isSelf ? (
                <>
                  <div
                    className="card__action"
                    onClick={() => handleOnDelete()}
                  >
                    <i className="icon icon--delete"></i>
                    <p className="card__action-text card__action-text--delete">
                      Delete
                    </p>
                    <div className="card__action-mask"></div>
                  </div>
                  <div
                    className="card__action"
                    onClick={() => setIsEdit((isEdit) => !isEdit)}
                  >
                    <i className="icon icon--edit"></i>
                    <p className="card__action-text">Edit</p>
                    <div className="card__action-mask"></div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="card__action"
                    onClick={() => setIsOpen((isOpen) => !isOpen)}
                  >
                    <i className="icon icon--reply"></i>
                    <p className="card__action-text">Reply</p>
                    <div className="card__action-mask"></div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="card__main-bottom">
            <AnimatePresence>
              {isEdit ? (
                <>
                  <motion.textarea
                    className="card__edit"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    initial={{
                      opacity: 0,
                      y: -50,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -50,
                      scale: 0,
                    }}
                    transition={{ duration: 0.5, bounce: 0.5, type: "spring" }}
                  />
                  <motion.button
                    className="button button--update"
                    onClick={() => handleEdit()}
                    initial={{
                      opacity: 0,
                      y: -50,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    whileHover={{
                      scale: 1.1,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                  >
                    UPDATE
                  </motion.button>
                </>
              ) : (
                <motion.p
                  className="card__content"
                  initial={{
                    opacity: 0,
                    y: 50,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                >
                  {replyingTo && (
                    <span className="card__replying-to">@{replyingTo}</span>
                  )}
                  &nbsp;{content}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Card
