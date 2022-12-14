import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "../axios"

import { Post } from "../components/Post"
import { Index } from "../components/AddComment"
import { CommentsBlock } from "../components/CommentsBlock"
import ReactMarkdown from "react-markdown"
import { useSelector } from "react-redux"
import { selectIsAuth } from "../redux/slices/auth"

export const FullPost = () => {
  const [data, setData] = useState()
  const [comments, setComments] = useState()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const isAuth = useSelector(selectIsAuth)

  const { id } = useParams()

  const userData = useSelector((state) => state.auth.data)

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        console.log(res)
        setData(res.data)
        setComments(res.data.comments)
        setIsLoading(false)
      })
      .catch((e) => {
        console.warn(e)
        alert("Failed to get article")
      })
  }, [])

  const onSubmit = async (text) => {
    try {
      const fields = {
        text,
        postId: id,
      }
      console.log(fields)
      setIsSubmitted(true)
      await axios.post(`/posts/${id}/comment`, fields).then((res) => {
        setData(res.data)
        setComments(res.data.comments)
        setIsSubmitted(false)
      })
    } catch (err) {
      console.warn(err)
      alert("Failed to create article")
    }
  }

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={
          data.imageUrl
            ? `${process.env.REACT_APP_API_URL}${data.imageUrl}`
            : ""
        }
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={comments} isLoading={false}>
        {isAuth ? (
          <Index
            avatarUrl={userData.avatarUrl}
            onSubmit={onSubmit}
            isSubmitted={isSubmitted}
          />
        ) : null}
      </CommentsBlock>
    </>
  )
}
