import React from "react"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import "./Card.scss"

const Card = ({ info, currentUserName, setIsOpen }) => {
  const { content, createdAt, score, user, replyingTo } = info
  const isSelf = currentUserName === user.username

  return (
    <div className={`card ${replyingTo && "card--reply"}`}>
      <div className="card__comment">
        <div className="card__score-box">
          <i className="icon icon--plus"></i>
          <p className="card__score">{score}</p>
          <i className="icon icon--minus"></i>
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
                  <div className="card__action">
                    <i className="icon icon--delete"></i>
                    <p className="card__action-text card__action-text--delete">
                      Delete
                    </p>
                  </div>
                  <div className="card__action">
                    <i className="icon icon--edit"></i>
                    <p className="card__action-text">Edit</p>
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
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="card__main-bottom">
            <p className="card__content">
              {replyingTo && (
                <span className="card__replying-to">@{replyingTo}</span>
              )}
              &nbsp;{content}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
