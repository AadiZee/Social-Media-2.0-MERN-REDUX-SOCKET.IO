import React, { useState } from "react";
import { UilPen } from "@iconscout/react-unicons";
import "./InfoCard.css";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import * as UserApi from "../../api/UserRequest";
import { logOut } from "../../actions/AuthActions";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();

  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { userData } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === userData._id) {
        setProfileUser(userData);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, []);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Information</h4>
        <div>
          {userData._id === profileUserId && (
            <>
              <UilPen
                width="2rem"
                height="1.2rem"
                onClick={() => setModalOpened(true)}
              />
              <ProfileModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
                data={userData}
              />
            </>
          )}
        </div>
      </div>

      {profileUser?.relationshipStatus && (
        <div className="info">
          <span>
            <b>Status </b>
          </span>
          <span>{profileUser?.relationshipStatus}</span>
        </div>
      )}

      {profileUser?.livesIn && (
        <div className="info">
          <span>
            <b>Lives in </b>
          </span>
          <span>{profileUser?.livesIn}</span>
        </div>
      )}

      {profileUser?.worksAt && (
        <div className="info">
          <span>
            <b>Works at </b>
          </span>
          <span>{profileUser?.worksAt}</span>
        </div>
      )}

      {!profileUser?.relationshipStatus &&
        !profileUser?.livesIn &&
        !profileUser?.worksAt && (
          <div className="info">
            <span>
              <b>No Personal Information Added </b>
            </span>
          </div>
        )}

      {userData._id === profileUserId && (
        <button className="button logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default InfoCard;
