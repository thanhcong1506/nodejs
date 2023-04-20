import axios from "axios";

const newRequest = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://ecommerce-utm9.onrender.com",
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  //   "Content-Type": "application/json",
  // },
  withCredentials: "include",
});

export default newRequest;
