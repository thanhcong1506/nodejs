import axios from "axios";

const newRequest = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://ecommerce-utm9.onrender.com/api",
  // headers: {
  //   "Content-Type": "application/json",
  //   Accept: "application/json",
  //   "Access-Control-Allow-Origin": "http://localhost:3000",
  // },
  credentials: "include",
  withCredentials: true,
});

export default newRequest;
