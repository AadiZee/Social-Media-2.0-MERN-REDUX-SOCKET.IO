import React, { useEffect, useState } from "react";
import "./Posts.css";
// import { FeedPosts } from "../../Data/FeedPosts";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getProfilePosts, getTimelinePosts } from "../../actions/PostActions";
import { Loader } from "@mantine/core";
import { useParams } from "react-router-dom";

const Posts = ({ page }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const [following, setFollowing] = useState(true);
  const params = useParams();
  const profileUserId = params.id;

  useEffect(() => {
    // if (page === "Home") {
    dispatch(getTimelinePosts(userData._id));
    // } else if (page === "Profile") {
    //   if (userData._id !== profileUserId) {
    //     if (userData.following.includes(profileUserId)) {
    //       setFollowing(true);
    //       dispatch(getProfilePosts(profileUserId));
    //     } else {
    //       setFollowing(false);
    //     }
    //   } else if (userData._id === profileUserId) {
    //     setFollowing(true);
    //     dispatch(getProfilePosts(profileUserId));
    //   }
    // }
  }, []);

  if (!posts) return "No Posts";
  if (params.id) {
    posts = posts.filter((post) => post.userId === params.id);
  }
  return (
    <div className="Posts">
      {following ? (
        loading ? (
          <Loader color="dark" size="xl" style={{ margin: "auto" }} />
        ) : (
          posts.map((post, index) => {
            return <Post data={post} key={index} />;
          })
        )
      ) : (
        <div className="Post" style={{ textAlign: "center" }}>
          <h1>You are not following this user.</h1>
          <h1> Follow them to see their posts</h1>
        </div>
      )}
    </div>
  );
};

export default Posts;
