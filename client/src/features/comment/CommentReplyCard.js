import React, { useState } from "react"
import Card from "../../components/Card"
import UserCard from "./UserCard"

const CommentReplyCard = ({ reply, currentUserName }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Card
        info={reply}
        currentUserName={currentUserName}
        setIsOpen={setIsOpen}
      />
      {isOpen && <UserCard replying={true} />}
    </>
  )
}

export default CommentReplyCard
