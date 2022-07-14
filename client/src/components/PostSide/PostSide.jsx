import React from "react";
import PostShare from "../PostShare/PostShare";
import Posts from "../Posts/Posts";
import "./PostSide.css";

const PostSide = ({ page }) => {
  return (
    <div className="PostSide">
      <PostShare />
      <Posts page={page} />
    </div>
  );
};

export default PostSide;
