import React from "react";
import FollowersCard from "../FollowersCard/FollowersCard";
import LogoSearch from "../LogoSearch/LogoSearch";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./ProfileSide.css";

const ProfileSide = ({ page }) => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCard page={page} />
      <FollowersCard />
    </div>
  );
};

export default ProfileSide;
