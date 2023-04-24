import axios from "axios";

const newRequest = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://ecommerce-utm9.onrender.com/api",
  crossDomain: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "https://thanhcongecommerce.onrender.com/",
  },
  credentials: "include",
  withCredentials: true,
});

export default newRequest;
