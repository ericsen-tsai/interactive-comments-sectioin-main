import React from "react"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import "./CommentCard.scss"

const CommentCard = ({ comment, currentUserName }) => {
  const { content, createdAt, score, user } = comment
  const isSelf = currentUserName === user.username

  return (
    <div className="commentcard__comment">
      <div className="commentcard__score-box">
        <i className="icon icon--plus"></i>
        <p className="commentcard__score">{score}</p>
        <i className="icon icon--minus"></i>
      </div>
      <div className="commentcard__main">
        <div className="commentcard__main-top">
          <div className="commentcard__info">
            <div className="commentcard__avatar-box">
              <img
                src={user.image.png}
                alt={user.username}
                className="commentcard__avatar"
              />
            </div>
            <p className="commentcard__username">{user.username}</p>
            {isSelf && <p className="commentcard__self-tag">you</p>}
            <p className="commentcard__datetimefromnow">
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </p>
          </div>
          <div className="commentcard__action-box">
            {isSelf ? (
              <>
                <div className="commentcard__action">
                  <i className="icon icon--delete"></i>
                  <p className="commentcard__action-text commentcard__action-text--delete">
                    Delete
                  </p>
                </div>
                <div className="commentcard__action">
                  <i className="icon icon--edit"></i>
                  <p className="commentcard__action-text">Edit</p>
                </div>
              </>
            ) : (
              <>
                <div className="commentcard__action">
                  <i className="icon icon--reply"></i>
                  <p className="commentcard__action-text">Reply</p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="commentcard__main-bottom">
          <p className="commentcard__content">{content}</p>
        </div>
      </div>
    </div>
  )
}

export default CommentCard
