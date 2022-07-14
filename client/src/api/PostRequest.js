import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

export const getTimelinePosts = async (id) =>
  await API.get(`/post/${id}/timeline`);

export const getProfilePosts = async (id) =>
  await API.get(`/post/${id}/profile`);

export const likePost = (id, userId) =>
  API.put(`/post/${id}/like`, { currentUserId: userId });
