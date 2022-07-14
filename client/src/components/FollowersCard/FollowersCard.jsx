import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
// import { Followers } from "../../Data/FollowersData";
import User from "../User/User";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../api/UploadRequest";

const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const { userData } = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUsers();
      setPersons(data);
    };
    fetchPersons();
  }, []);
  return (
    <div className="FollowerCard">
      <h3>People you may know</h3>
      {persons.map((person, index) => {
        if (person._id !== userData._id) {
          return <User person={person} key={index} />;
        }
        return;
      })}
    </div>
  );
};

export default FollowersCard;
