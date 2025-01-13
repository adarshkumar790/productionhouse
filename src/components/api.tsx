import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Replace with your backend URL
});

export const signup = (data: { name: string; email: string; password: string }) =>
  API.post("/signup", data);

export const signin = (data: { email: string; password: string }) =>
  API.post("/login", data);

export const forgotPassword = (data: { email: string }) =>
  API.post("/forgotpassword", data);
