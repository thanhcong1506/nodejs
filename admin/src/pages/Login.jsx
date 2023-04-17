import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import newRequest from "../utils/newRequest";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, dispatch } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await newRequest.post("/auth/login", { email, password });
      if (res.data.isAdmin || res.data.role === 1) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        toast.success("Login success");
        navigate("/admin");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not admin or counsellor!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="container">
      <div className="register-container">
        <div className="pt-5 w-50 m-auto">
          <form
            onSubmit={handleSubmit}
            className=" shadow p-3 mb-5 bg-white rounded"
            action=""
          >
            <h3 className=" text-center p-5">Sign In</h3>
            <div className=" d-flex flex-column px-5">
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
              />

              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />

              <button
                type="submit"
                className="btn rounded-0 py-3 btn-dark text-center w-100"
              >
                SIGN IN
              </button>
              {error && <span style={{ color: "red" }}>{error.message}</span>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
