import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import newRequest from "../utils/newRequest";
import removeCookie from "../utils/removeCookie";

function NavBar() {
  const amount = useSelector((state) => state.cart.cartItems.length);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser");
      // removeCookie("accessToken");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className=" mx-1 ">
        <Container className=" px-5">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Col className=" d-lg-flex gap-4 ps-3">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/shop">
                Shop
              </Nav.Link>
            </Col>
            <Col className=" d-lg-flex justify-content-center">
              <Navbar.Brand className="" as={Link} to="/">
                Boutique
              </Navbar.Brand>
            </Col>
            <Col className=" d-lg-flex gap-4 justify-content-end pe-3">
              <Nav.Link as={Link} to="/cart">
                <div className=" d-flex gap-1 position-relative">
                  <FaShoppingCart className="  pe-1 pt-1 h5" />
                  <div className="amount-container">
                    <p className="total-amount">{amount}</p>
                  </div>
                  <p>Cart</p>
                </div>
              </Nav.Link>
              <div>
                <FaUser className="pe-1 h5 pt-1" />

                {currentUser ? (
                  <>
                    <span className=" pe-2">{currentUser.name}</span>
                    <span
                      style={{ cursor: "pointer" }}
                      className=" text-success fw-bold"
                      onClick={() => handleLogout()}
                    >
                      (Logout)
                    </span>
                  </>
                ) : (
                  <Link
                    className=" text-decoration-none text-black-50"
                    to="/login"
                  >
                    Login
                  </Link>
                )}
              </div>
            </Col>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section>
        <Outlet />
      </section>
    </>
  );
}

export default NavBar;
