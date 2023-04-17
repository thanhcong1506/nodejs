import React, { useEffect, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { AiFillGift } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateItem } from "../redux/cartSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(
      cart.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    );
  }, [cart]);

  const updateQuantity = (item, opt) => {
    // console.log(opt);
    if (opt === "+") {
      dispatch(
        updateItem({
          ...item,
          quantity: item.quantity + 1,
          totalPrice: item.price * (item.quantity + 1),
        })
      );
    }
    if (opt === "-") {
      dispatch(
        updateItem({
          ...item,
          quantity: item.quantity - 1 === 0 ? 1 : item.quantity - 1,
          totalPrice: item.price * (item.quantity - 1),
        })
      );
    }
  };

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
    toast.success("Deleted cart");
  };
  return (
    <div className="container">
      <div className=" m-5 py-5 bg-light">
        <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
          <div className="col-lg-6">
            <h1 className="h2 text-uppercase mb-0">Cart</h1>
          </div>
          <div className="col-lg-6 text-lg-right">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                <li className="breadcrumb-item active" aria-current="page">
                  Cart
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className=" px-5">
        <h3>SHOPPING CART</h3>
        <div className="row">
          <div className=" col-8">
            {cart.length === 0 ? (
              <h4 className=" fw-bold text-danger text-center ">Cart Empty</h4>
            ) : (
              <table className=" table  ">
                <thead>
                  <tr className=" bg-light ">
                    <th className=" text-center" scope="col">
                      IMAGE
                    </th>
                    <th className=" text-center" scope="col">
                      PRODUCT
                    </th>
                    <th className=" text-center" scope="col">
                      PRICE
                    </th>
                    <th className=" text-center" scope="col">
                      QUANTITY
                    </th>
                    <th className=" text-center" scope="col">
                      TOTAL
                    </th>
                    <th className=" text-center" scope="col">
                      REMOVE
                    </th>
                  </tr>
                </thead>
                {cart &&
                  cart.map((cartItem) => {
                    return (
                      <tbody key={cartItem._id}>
                        <tr className=" text-center">
                          <td scope="row">
                            <img
                              className=" w-100"
                              src={cartItem.images && cartItem.images[0]}
                              alt="v"
                            />
                          </td>
                          <td className="  w-100 align-middle ">
                            {cartItem.name}
                          </td>
                          <td className=" align-middle ">
                            {cartItem.price.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}{" "}
                          </td>
                          <td className=" align-middle ">
                            <span onClick={() => updateQuantity(cartItem, "-")}>
                              <FaChevronCircleLeft />
                            </span>
                            <span className=" px-1">{cartItem.quantity}</span>
                            <span onClick={() => updateQuantity(cartItem, "+")}>
                              <FaChevronCircleRight />
                            </span>
                          </td>
                          <td className=" align-middle">
                            {(
                              cartItem.price * cartItem.quantity
                            ).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}{" "}
                          </td>
                          <td
                            className=" align-middle"
                            onClick={() => handleRemoveFromCart(cartItem)}
                          >
                            <RiDeleteBin6Line />
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            )}

            <div className=" d-flex justify-content-between bg-light p-3 ">
              <div>
                <Link
                  className=" text-decoration-none text-black-50"
                  to="/shop"
                >
                  <GrLinkPrevious />
                  <span className=" ps-2">Continue shopping</span>
                </Link>
              </div>
              <div>
                <Link
                  className=" text-decoration-none text-black-50"
                  to="/checkout"
                >
                  <span className=" border border-dark p-2">
                    Proceed to checkout
                    <GrLinkNext />
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-4 p-5 bg-light" style={{ maxHeight: 350 }}>
            <h3> CART TOTAL</h3>
            <div className=" d-flex justify-content-between pt-3 ">
              <p>SUBTOTAL</p>
              <span>
                {total.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
              </span>
            </div>
            <hr />
            <div className=" d-flex justify-content-between ">
              <p>TOTAL</p>
              <span>
                {total.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
              </span>
            </div>
            <input
              className=" p-2"
              type="text"
              placeholder="Enter your coupon"
            />
            <button className="p-2 w-100 bg-black text-white">
              <AiFillGift /> Apply Coupon
            </button>
          </div>
          <div
            style={{
              maxWidth: "200px",
              margin: "10px",
            }}
          >
            <button
              onClick={() => {
                navigate("/history");
              }}
              className=" btn btn-outline-dark p-2"
            >
              Purchase history
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
