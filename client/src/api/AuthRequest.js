import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

export const logIn = async (formData) =>
  await API.post("/auth/login", formData);
export const signUp = async (formData) =>
  await API.post("/auth/register", formData);
