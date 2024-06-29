"use client";
import React, { useContext, useEffect } from "react";
import Post from "./Post";
import { PostListContext } from "@/store/post-list-store";

const PostList = () => {
  const { postList, addInitialPosts, error, loading } =
    useContext(PostListContext);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json(); // Parse the response as JSON
        addInitialPosts(data); // Set the parsed data to the state
      } catch (error) {
        console.error("Error fetching initial posts:", error);
      }
    };
    fetchInitialPosts();
  }, [addInitialPosts]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {postList.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          id={post.id}
          userName={post.userName}
          tags={post.tags}
          reactions={post.reactions.likes}
          body={post.body}
        />
      ))}
    </div>
  );
};

export default PostList;
