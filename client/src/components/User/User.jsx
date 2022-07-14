import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/UserActions";

const User = ({ person }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.authReducer.authData);
  const [following, setFollowing] = useState(
    person.followers.includes(userData._id)
  );

  const handleFollow = async () => {
    dispatch(followUser(person._id, userData._id));
    setFollowing(!following);
  };

  const handleUnFollow = async () => {
    dispatch(unFollowUser(person._id, userData._id));
    setFollowing(!following);
  };
  return (
    <div className="follower">
      <div>
        <img
          src={
            person?.profilePicture
              ? serverPublic + person?.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt={person?.username}
          className="followerImg"
        />
        <div className="name">
          <span>{`${person?.firstName}  ${person?.lastName}`}</span>
          <span>@{person.username}</span>
        </div>
      </div>

      {following ? (
        <button
          className="button fc-button UnfollowButton"
          onClick={() => handleUnFollow()}
        >
          Unfollow
        </button>
      ) : (
        <button className="button fc-button" onClick={() => handleFollow()}>
          Follow
        </button>
      )}
    </div>
  );
};

export default User;
