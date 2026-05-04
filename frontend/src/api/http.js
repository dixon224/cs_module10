import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
console.log("API URL:", baseURL);

const http = axios.create({
  baseURL,
  withCredentials: true,
});

export async function loginUser(data) {
  const res = await http.post("/user/login", data);
  return res.data;
}

export async function logoutUser() {
  const res = await http.post("/user/logout");
  return res.data;
}

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default http;
