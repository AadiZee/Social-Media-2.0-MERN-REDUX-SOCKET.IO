import React, { useState, useRef } from "react";
import "./PostShare.css";
import ProfileImage from "../../img/profileImg.jpg";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadActions";
import { Loader } from "@mantine/core";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const loading = useSelector((state) => state.postReducer.uploading);
  const dispatch = useDispatch();
  const imageRef = useRef();
  const desc = useRef();
  const { userData } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      userId: userData._id,
      desc: desc.current.value,
    };

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        return console.log(error);
      }
    }
    dispatch(uploadPost(newPost));
    reset();
  };

  return (
    <div className="PostShare">
      <img
        src={
          userData?.profilePicture
            ? serverPublic + userData?.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt="Profile-Main"
      />

      <div>
        <input
          type="text"
          placeholder="What's happening?"
          ref={desc}
          required
          disabled={loading}
        />

        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
            disabled={loading}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--schedule)" }}>
            <UilSchedule />
            Schedule
          </div>
          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Loader color="dark" size="sm" /> : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="Post Pic" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
