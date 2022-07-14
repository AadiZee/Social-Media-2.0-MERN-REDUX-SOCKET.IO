import React from "react";
import "./ProfileCard.css";
// import Cover from "../../img/cover.jpg";
// import ProfileImage from "../../img/profileImg.jpg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = ({ page }) => {
  const { userData } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const ProfilePage =
    page === "Profile" ? true : page === "Home" ? false : false;

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            userData?.coverPicture
              ? serverPublic + userData.coverPicture
              : serverPublic + "defaultCover.jpg"
          }
          alt="Profile-Cover"
        />
        <img
          src={
            userData?.profilePicture
              ? serverPublic + userData.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="Profile-Main"
        />
      </div>

      <div className="ProfileName">
        <span>
          {userData?.firstName} {userData?.lastName}
        </span>
        <span>{userData?.about || "Write about yourself!"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{userData?.followers?.length || 0}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{userData?.following?.length || 0}</span>
            <span>Followings</span>
          </div>

          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts?.filter((post) => post.userId === userData._id)
                    ?.length || 0}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {!ProfilePage && (
        <span>
          <Link
            to={`/profile/${userData._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
