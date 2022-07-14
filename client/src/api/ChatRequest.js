import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

export const userChats = async (userId) => await API.get(`/chat/${userId}`);
