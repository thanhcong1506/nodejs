import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkOutSchema } from "../schemas";
import { useFormik } from "formik";
import newRequest from "../utils/newRequest";
import { clearCart } from "../redux/cartSlice";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const dispath = useDispatch();
  // console.log(cart);
  const cartItem = cart.map((item, i) => {
    return {
      key: i,
      name: item.name,
      quantity: item.quantity,
      image: item.images[0],
      price: item.price,
      product: item._id,
    };
  });
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    setTotal(
      cart.reduce(
        (acc, cur) => acc + Number(cur.quantity) * Number(cur.price),
        0
      )
    );
  }, [cart]);

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const initialValues = {
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: "",
  };

  const onSubmit = async (values, actions) => {
    const orderData = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      cartItems: cartItem,
      totalBill: total,
    };
    const res = await newRequest.post("/order", orderData);
    dispath(clearCart());
    navigate("/history");
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

    validationSchema: checkOutSchema,
    onSubmit,
  });

  return (
    <div className=" container">
      <div className=" m-5 py-5 bg-light">
        <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
          <div className="col-lg-6">
            <h1 className="h2 text-uppercase mb-0">CHECKOUT</h1>
          </div>
          <div className="col-lg-6 text-lg-right">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                <li>
                  <Link className=" text-decoration-none text-black" to="/">
                    HOME{" "}
                  </Link>
                  <span className=" fw-bold">&ensp;/</span>
                </li>
                <li>
                  <Link className=" text-decoration-none text-black" to="/cart">
                    &ensp;CART{" "}
                  </Link>
                  <span className=" fw-bold">&ensp;/</span>
                </li>
                <li className=" text-black-50">&ensp;CHECKOUT</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className=" px-5 pb-4">
        <h4 className=" pb-3">BILLING DETAILS</h4>
        <div className=" row">
          <div className=" col-8 ">
            <form onSubmit={handleSubmit} className="">
              <div>
                <label htmlFor="" className="form-label pt-2">
                  FULL NAME
                </label>
                <input
                  className=" form-control "
                  type="text"
                  name="name"
                  placeholder="Enter Your Full Name Here!"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && (
                  <p className="error">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="" className="form-label pt-2">
                  EMAIL
                </label>
                <input
                  name="email"
                  className=" form-control py-2"
                  type="text"
                  placeholder="Enter Your Email Here!"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <p className="error">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="" className="form-label pt-2">
                  PHONE NUMBER
                </label>
                <input
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="phone"
                  className=" form-control py-2"
                  type="text"
                  placeholder="Enter Your Phone Number Here!"
                />
                {errors.phone && touched.phone && (
                  <p className="error">{errors.phone}</p>
                )}
              </div>
              <div>
                <label htmlFor="" className="form-label pt-2">
                  ADDRESS
                </label>
                <input
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="address"
                  className=" form-control "
                  type="text"
                  placeholder="Enter Your Address Here!"
                />
                {errors.address && touched.address && (
                  <p className="error">{errors.address}</p>
                )}
              </div>
              <button
                type=" submit"
                className=" btn  btn-dark w-25 text-white my-2"
              >
                Place Order
              </button>
            </form>
          </div>
          <div className=" col-4 bg-light px-5 pt-3 h-auto d-inline-block">
            <h3 className=" text-bg-success p-2 text-center">YOUR ORDER</h3>
            {cart.map((cartItem) => (
              <>
                <div key={cartItem._id} className=" d-flex">
                  <p className=" fw-bold" style={{ flex: 2 }}>
                    {cartItem.name}
                  </p>
                  <div className=" d-flex gap-1 text-black-50 align-items-center ps-2 ">
                    <p className=" ">
                      {cartItem.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}{" "}
                    </p>
                    <p>x</p>
                    <p className=" text-black-50">{cartItem.quantity}</p>
                  </div>
                </div>
                <hr />
              </>
            ))}
            <div className=" d-flex justify-content-between">
              <p className=" fw-bold">TOTAL</p>
              <p className=" text-black-50 fs-5">
                {total.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
