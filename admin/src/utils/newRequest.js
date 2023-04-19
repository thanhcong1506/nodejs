import axios from "axios";

const newRequest = axios.create({
  // baseURL: "http://localhost:5000/api/",
  baseURL: "https://ecommerce-admin-a67s.onrender.com",
  withCredentials: true,
});

export default newRequest;
