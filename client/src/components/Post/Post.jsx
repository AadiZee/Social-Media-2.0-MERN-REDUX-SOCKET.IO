import React, { useEffect, useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import HeartOutline from "../../img/notlike.png";
import { useSelector } from "react-redux";
import { likePost } from "../../api/PostRequest";
import { getUser } from "../../api/UserRequest";

const Post = ({ data }) => {
  const { userData } = useSelector((state) => state.authReducer.authData);
  const [postUserData, setPostUserData] = useState(null);

  const [liked, setLiked] = useState(data.likes.includes(userData._id));
  const [likes, setLikes] = useState(data.likes.length);

  useEffect(() => {
    const userId = data.userId;

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setPostUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  const handleLike = async () => {
    setLiked(!liked);
    liked ? setLikes(likes - 1) : setLikes(likes + 1);
    await likePost(data._id, userData._id);
  };

  return (
    <div className="Post">
      {data && data?.image && (
        <img
          src={
            data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""
          }
          alt={`${data.name}'s post`}
        />
      )}

      <div className="postReact">
        <img
          src={liked ? Heart : HeartOutline}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} Likes
      </span>

      <div className="detail">
        <span>
          <b>
            {postUserData?.firstName} {postUserData?.lastName} :&nbsp;
          </b>
        </span>

        <span>{data?.desc}</span>
      </div>
    </div>
  );
};

export default Post;
