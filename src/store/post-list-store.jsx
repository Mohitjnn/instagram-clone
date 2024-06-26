"use client";
import { createContext, useReducer, useEffect } from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  addInitialPosts: () => {},
});

const postListReducer = (currPostList, action) => {
  switch (action.type) {
    case "DELETE_POST":
      return currPostList.filter(
        (post) => post.title !== action.payload.postTitle
      );
    case "ADD_POST":
      return [action.payload, ...currPostList];
    case "ADD_INITIAL_POSTS":
      return action.payload.posts;
    default:
      return currPostList;
  }
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        dispatchPostList({
          type: "ADD_INITIAL_POSTS",
          payload: { posts: data },
        });
      } catch (error) {
        console.error("Error fetching initial posts:", error);
      }
    };

    fetchInitialPosts();
  }, []);

  const addPost = async (
    userId,
    postTitle,
    postBody,
    likes,
    dislikes,
    tags
  ) => {
    const newPost = {
      title: postTitle,
      body: postBody,
      reactions: { likes, dislikes },
      userId,
      tags,
    };

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Failed to add post");
      }

      const savedPost = await response.json();
      dispatchPostList({ type: "ADD_POST", payload: savedPost });
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const deletePost = async (postTitle) => {
    try {
      const response = await fetch("/api/posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postTitle }), // Send postTitle in the request body
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      dispatchPostList({ type: "DELETE_POST", payload: { postTitle } });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <PostListContext.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
