import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";
import { toast } from "react-toastify";
import removeCookie from "../utils/removeCookie";
import setCookie from "../utils/setCookie";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const onInput = () => {
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("currentUser", JSON.stringify(res.data));
      // removeCookie("accessToken");
      // const accessToken = JSON.parse(localStorage.getItem("currentUser")).token;
      // setCookie("accessToken", accessToken);
      if (location.state) {
        navigate(location.state);
      } else {
        navigate("/");
        toast.success("Login success");
      }
    } catch (err) {
      setError(err.response.data);

      console.log(err);
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
                onInput={onInput}
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
              {error && (
                <span ref={ref} style={{ color: "red" }}>
                  {error.message}
                </span>
              )}
              <div className=" p-5 m-auto d-flex gap-2">
                <p>Creat an account ? </p>
                <Link className=" text-decoration-none" to="/register">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
