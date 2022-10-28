import React, { useEffect, useState } from "react"

import styles from "./AddComment.module.scss"

import TextField from "@mui/material/TextField"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"

export const Index = ({ onSubmit, avatarUrl, isSubmitted }) => {
  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    setCommentText("")
  }, [isSubmitted])
  console.log("av", avatarUrl)
  const isAvatarUrl = avatarUrl ? "" : "#000"

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          style={{ backgroundColor: isAvatarUrl }}
          src={avatarUrl || ""}
        />
        <div className={styles.form}>
          <TextField
            label="Type a comment"
            variant="outlined"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={() => onSubmit(commentText)} variant="contained">
            Send
          </Button>
        </div>
      </div>
    </>
  )
}
