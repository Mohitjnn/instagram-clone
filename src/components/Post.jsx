"use client";
import React, { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { PostListContext } from "@/store/post-list-store";

const Post = ({ title, tags, reactions, body, userName }) => {
  const { deletePost } = useContext(PostListContext);

  return (
    <div className="card post-card" style={{ width: "100%" }}>
      <div className="card-body">
        <h5 className="card-title">User: {userName}</h5>
        <h5 className="card-title">
          {title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(title, userName)} // Pass title to deletePost function
          >
            <AiFillDelete />
          </span>
        </h5>
        <p className="card-text">{body}</p>
        {tags.map((tag) => (
          <span key={tag} className="badge text-bg-primary hashtag">
            {tag}
          </span>
        ))}
        <div className="alert alert-success reactions" role="alert">
          This post has been reacted by {reactions} people.
        </div>
      </div>
    </div>
  );
};

export default Post;
