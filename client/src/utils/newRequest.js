import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://ecommerce-utm9.onrender.com/api/",
  withCredentials: true,
});

export default newRequest;
