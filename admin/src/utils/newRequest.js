import axios from "axios";

const newRequest = axios.create({
  // baseURL: "http://localhost:5000/api/",
  baseURL: "https://ecommerce-utm9.onrender.com/api",
  withCredentials: true,
});

export default newRequest;
