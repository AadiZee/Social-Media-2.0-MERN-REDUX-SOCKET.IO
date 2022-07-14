import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

export const uploadImage = async (data) => await API.post("/upload", data);

export const uploadPost = async (data) => await API.post("/post", data);

export const getAllUsers = async () => await API.get("/user");
