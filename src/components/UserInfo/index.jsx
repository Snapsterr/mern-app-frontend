import React from "react"
import styles from "./UserInfo.module.scss"

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  const date = new Date(additionalText).toLocaleString("en-EU", {
    dateStyle: "short",
    timeStyle: "short",
  })
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{date}</span>
      </div>
    </div>
  )
}
