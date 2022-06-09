import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

import {
  togglePopup,
  chooseIntendedDelete,
  selectComments,
} from "../features/comment/commentSlice"
import { editComment, editReply } from "../features/comment/commentService"

import "./Card.scss"

const Card = ({ info, currentUserName, setIsOpen, commentId }) => {
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useDispatch()
  const comments = useSelector(selectComments)
  const { content, createdAt, score, user, replyingTo, id } = info

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
    let comment = { ...comments[commentId] }
    if (replyingTo) {
      dispatch(
        editReply({
          ...comment,
          replies: comment.replies.map((reply) => {
            if (reply.id === id) {
              return { ...reply, score: reply.score + num }
            }
            return reply
          }),
        })
      )
      return
    }

    dispatch(editComment({ ...comment, score: (comment.score += num) }))
  }

  return (
    <div
      className={`card ${replyingTo ? "card--reply" : ""}`}
      style={isEdit ? { paddingBottom: "10rem" } : {}}
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
            {isEdit ? (
              <>
                <textarea
                  className="card__edit"
                  value={`@${replyingTo}, ${content}`}
                ></textarea>
                {/*TODO handleUpdate function for edit comment or reply*/}
                <button className="card__button">UPDATE</button>
              </>
            ) : (
              <p className="card__content">
                {replyingTo && (
                  <span className="card__replying-to">@{replyingTo}</span>
                )}
                &nbsp;{content}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
