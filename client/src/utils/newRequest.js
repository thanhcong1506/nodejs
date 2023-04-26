import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://ecommerce-utm9.onrender.com/api",
  baseURL: "https://ecommerce-utm9.onrender.com/api",
  headers: {
    token: `Bearer ${
      JSON.parse(localStorage.getItem("currentUser")).token || ""
    }`,
  },

  credentials: "include",
  withCredentials: true,
});

export default newRequest;
