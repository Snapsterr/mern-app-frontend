import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (sortValue) => {
    const { data } = await axios.get(`/posts?sort=${sortValue}`)
    return data
  }
)

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags")
  return data
})

export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async () => {
    const { data } = await axios.get("/comments")
    return data
  }
)

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => await axios.delete(`/posts/${id}`)
)

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  comments: {
    items: [],
    status: "loading",
  },
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducer: {},
  extraReducers: {
    //fetchPosts
    [fetchPosts.pending]: (state) => {
      state.posts.items = []
      state.posts.status = "loading"
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload
      state.posts.status = "loaded"
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = []
      state.posts.status = "error"
    },
    //fetchTags
    [fetchTags.pending]: (state) => {
      state.tags.items = []
      state.tags.status = "loading"
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload
      state.tags.status = "loaded"
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = []
      state.tags.status = "error"
    },
    //fetchComments
    [fetchComments.pending]: (state) => {
      state.comments.items = []
      state.comments.status = "loading"
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload
      state.comments.status = "loaded"
    },
    [fetchComments.rejected]: (state) => {
      state.comments.items = []
      state.comments.status = "error"
    },
    //fetchRemovePost
    [fetchRemovePost.pending]: (state, action) => {
      console.log(state.posts.items)
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      )
      state.tags.status = "loading"
    },
  },
})

export const postReducer = postsSlice.reducer
