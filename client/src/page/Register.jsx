import React, { useState } from "react";
import { useFormik } from "formik";
import { basicSchema } from "../schemas";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";

const Register = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  };

  const onSubmit = async (values, actions) => {
    console.log(values);
    try {
      const res = await newRequest.post("/auth/register", values);
      console.log(res.data);

      actions.resetForm();
      window.alert("Sign up success!!");
      navigate("/login");
    } catch (error) {
      setError(error.response.data);
      console.log(error);
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,

    validationSchema: basicSchema,
    onSubmit,
  });

  // console.log(errors);

  return (
    <div className=" container">
      <div className="register-container p-5 ">
        <form
          className="px-5 shadow"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h3 className=" text-center p-5">Sign Up</h3>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Full name"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name && touched.name ? "input-error" : ""}
          />
          {errors.name && touched.name && (
            <p className="error">{errors.name}</p>
          )}
          <input
            value={values.email}
            onChange={handleChange}
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            onBlur={handleBlur}
            className={errors.email && touched.email ? "input-error" : ""}
          />
          <p className="error my-0" id="email"></p>
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}

          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "input-error" : ""}
          />
          {errors.password && touched.password && (
            <p className="error">{errors.password}</p>
          )}

          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.confirmPassword && touched.confirmPassword
                ? "input-error"
                : ""
            }
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}

          <input
            id="phone"
            type="text"
            name="phone"
            placeholder="Phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.phone && touched.phone ? "input-error" : ""}
          />
          {errors.phone && touched.phone && (
            <p className="error">{errors.phone}</p>
          )}
          <button
            className=" btn btn-dark py-3 w-100 rounded-0 my-2"
            disabled={isSubmitting}
            type="submit"
          >
            Sign up
          </button>
          {error && (
            <span className=" mx-auto bold text-danger text-center ">
              {error.message}
            </span>
          )}
          <p className=" text-center p-5 m-auto">
            Log in ?{" "}
            <Link className=" text-decoration-none" to="/login">
              Click
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Register;
