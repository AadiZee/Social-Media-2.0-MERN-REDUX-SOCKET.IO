import React from "react";
import PostSide from "../../components/PostSide/PostSide";
import RightSide from "../../components/RightSide/RightSide";
import ProfileSide from "../../components/ProfileSide/ProfileSide";
import "./Home.css";

const Home = () => {
  let page = "Home";
  return (
    <div className="Home">
      {/* Left Side */}
      <ProfileSide page={page} />
      {/* Middle of the Page */}
      <PostSide page={page} />
      {/* Right Side */}
      <RightSide />
    </div>
  );
};

export default Home;
