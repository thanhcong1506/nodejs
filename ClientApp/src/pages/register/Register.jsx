import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (user) => {
    try {
      await axios.post("/auth/register", user);

      toast.success("Register successfully");
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="lContainer">
          <h1 className="ltitle">Sign Up</h1>
          <input
            type="text"
            name="username"
            className="lInput"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {errors.username?.type && (
            <p style={{ color: "red" }}>Username is required</p>
          )}
          <input
            className="lInput"
            type="email"
            name="email"
            placeholder="email"
            {...register("email", { required: true })}
          />
          {errors.email?.type && (
            <p style={{ color: "red" }}>Email is required</p>
          )}
          <input
            name="password"
            type="password"
            className="lInput"
            placeholder="password"
            {...register("password", { required: true })}
          />
          {errors.password?.type && (
            <p style={{ color: "red" }}>Password is required</p>
          )}
          <button type="submit" className="lButton">
            Create Account
          </button>
        </div>
      </form>
      {/* {error && <span>{error.message}</span>} */}
    </div>
  );
};

export default Register;
// function Register() {
//   const { register, handleSubmit } = useForm();
//   const onSubmit = (data, e) => console.log(data, e);
//   const onError = (errors, e) => console.log(errors, e);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register("firstName")} />
//       <input {...register("lastName")} />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
// export default Register;
