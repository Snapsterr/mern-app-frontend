import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Grid from "@mui/material/Grid"

import { Post } from "../components/Post"
import { TagsBlock } from "../components/TagsBlock"
import { CommentsBlock } from "../components/CommentsBlock"
import { fetchComments, fetchPosts, fetchTags } from "../redux/slices/posts"

export const Home = () => {
  const [value, setValue] = useState("createdAt")
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.data)
  const { posts, tags, comments } = useSelector((state) => state.posts)

  const isPostsLoading = posts.status === "loading"
  const isTagsLoading = tags.status === "loading"

  useEffect(() => {
    dispatch(fetchTags())
    dispatch(fetchComments())
  }, [])

  useEffect(() => {
    dispatch(fetchPosts(value))
  }, [value])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={value}
        onChange={handleChange}
        sx={{
          "& button:hover": { backgroundColor: "#e9e9e9" },
        }}
      >
        <Tab value="createdAt" label="New" />
        <Tab value="viewsCount" label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl ? `http://localhost:3001${obj.imageUrl}` : ""
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.comments.length}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={comments.items} isLoading={false} />
        </Grid>
      </Grid>
    </>
  )
}
