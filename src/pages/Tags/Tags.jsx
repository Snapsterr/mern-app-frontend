import { Grid, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Post } from "../../components"
import axios from "../../axios"

import styles from "./Tags.module.scss"

const Tags = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const { tag } = useParams()

  console.log("name", tag)

  const isPostsLoading = data === []
  useEffect(() => {
    axios
      .get(`/tags/${tag}`)
      .then((res) => {
        console.log(res)
        setData(res.data)
        setIsLoading(false)
      })
      .catch((e) => {
        console.warn(e)
        alert("Failed to get article")
      })
  }, [tag])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }

  console.log("data", data)
  return (
    <>
      <h2 className={styles.title}>#{tag}</h2>
      <Grid xs={8} item>
        {(isPostsLoading ? [...Array(5)] : data).map((obj, index) => {
          console.log("obj", obj)

          return isPostsLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              key={index}
              id={obj._id}
              title={obj.title}
              imageUrl={
                obj.imageUrl
                  ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`
                  : ""
              }
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={obj.commentsCount}
              tags={obj.tags}
              isEditable={false}
            />
          )
        })}
      </Grid>
    </>
  )
}

export default Tags
