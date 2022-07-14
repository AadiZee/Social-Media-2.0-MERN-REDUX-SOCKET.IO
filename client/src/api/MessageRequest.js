import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

export const getMessages = async (id) => await API.get(`/message/${id}`);

export const addMessage = async (message) =>
  await API.post(`/message/`, message);
