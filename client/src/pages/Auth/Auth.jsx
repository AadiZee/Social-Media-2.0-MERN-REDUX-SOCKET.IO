import React from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthActions";

import { Loader } from "@mantine/core";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const loading = useSelector((state) => state.authReducer.loading);

  const dispatch = useDispatch();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordsMatch(true);
    setFirstNameError(false);
    setLastNameError(false);
    setUsernameError(false);
    setPasswordError(false);

    if (isSignUp) {
      if (
        data.password !== data.confirmPassword ||
        data.password === "" ||
        data.confirmPassword === ""
      ) {
        return setPasswordsMatch(false);
      }
      if (data.firstName === "") {
        return setFirstNameError(true);
      }
      if (data.lastName === "") {
        return setLastNameError(true);
      }
      if (data.username === "") {
        return setUsernameError(true);
      }
      return dispatch(signUp(data));
    } else if (!isSignUp) {
      if (data.username === "") {
        return setUsernameError(true);
      }
      if (data.password === "") {
        return setPasswordError(true);
      }
      return dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setPasswordsMatch(true);
    setFirstNameError(false);
    setLastNameError(false);
    setUsernameError(false);
    setData({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="Auth">
      {/* left side */}
      <div className="a-left">
        <img src={Logo} alt="main-logo" />
        <div className="Webname">
          <h1>Z Social Media</h1>
          <h6>Explore ideas throughout the world!</h6>
        </div>
      </div>

      {/* RIght side i.e the form */}
      <div className="a-right">
        <form action="" className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Register" : "Login"}</h3>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                style={{
                  border: firstNameError && "1px solid red",
                }}
                disabled={loading}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                style={{
                  border: lastNameError && "1px solid red",
                }}
                disabled={loading}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={handleChange}
              style={{
                border: usernameError && "1px solid red",
              }}
              disabled={loading}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => {
                handleChange(e);
              }}
              style={{
                border: (!passwordsMatch || passwordError) && "1px solid red",
              }}
              disabled={loading}
            />

            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={data.confirmPassword}
                onChange={(e) => {
                  handleChange(e);
                }}
                style={{
                  border: !passwordsMatch && "1px solid red",
                }}
                disabled={loading}
              />
            )}
          </div>

          {!passwordsMatch && (
            <small
              style={{
                color: "red",
                alignSelf: "flex-end",
                marginRight: "5px",
              }}
            >
              *Passwords don't match
            </small>
          )}
          {firstNameError && (
            <small
              style={{
                color: "red",
                alignSelf: "flex-end",
                marginRight: "5px",
              }}
            >
              *First Name is required!
            </small>
          )}
          {lastNameError && (
            <small
              style={{
                color: "red",
                alignSelf: "flex-end",
                marginRight: "5px",
              }}
            >
              *Last Name is required!
            </small>
          )}
          {usernameError && (
            <small
              style={{
                color: "red",
                alignSelf: "flex-end",
                marginRight: "5px",
              }}
            >
              *Username invalid or already taken!
            </small>
          )}
          {passwordError && (
            <small
              style={{
                color: "red",
                alignSelf: "flex-end",
                marginRight: "5px",
              }}
            >
              *Incorrect Password
            </small>
          )}
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              className="changeForm"
              onClick={() => {
                setIsSignUp(!isSignUp);
                resetForm();
              }}
              disabled={loading}
            >
              {isSignUp
                ? "Already have an account? Login!"
                : "Don't have an account? Register!"}
            </span>
          </div>

          <button
            className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Loader color="dark" size="sm" />
            ) : isSignUp ? (
              "Register"
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
