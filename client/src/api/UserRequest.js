import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getUser = async (userId) => await API.get(`/user/${userId}`);

export const updateUser = async (userId, formData) =>
  await API.put(`/user/${userId}`, {
    ...formData,
    currentUserId: formData._id,
    currentUserAdminStatus: formData.isAdmin,
  });

export const followUser = async (followId, userId) =>
  await API.put(`/user/${followId}/follow`, {
    currentUserId: userId,
  });

export const unFollowUser = async (unFollowId, userId) =>
  await API.put(`/user/${unFollowId}/unfollow`, {
    currentUserId: userId,
  });
