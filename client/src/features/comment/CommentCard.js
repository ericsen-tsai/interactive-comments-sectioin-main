import React, { useState } from "react"
import Card from "../../components/Card"
import UserCard from "./UserCard"

const CommentCard = ({ comment, currentUserName }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Card
        info={comment}
        currentUserName={currentUserName}
        setIsOpen={setIsOpen}
      />
      {isOpen && <UserCard />}
    </>
  )
}

export default CommentCard