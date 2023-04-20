import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../images/banner1.jpg";
import product1 from "../images/product_1.png";
import product2 from "../images/product_2.png";
import product3 from "../images/product_3.png";
import product4 from "../images/product_4.png";
import product5 from "../images/product_5.png";
import Popup from "../components/Popup/Popup";
import newRequest from "../utils/newRequest";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productsModal, setProductsModal] = useState([]);

  const [show, setShow] = useState(false);

  const handleShow = (img, name, price, short_desc) => {
    const data = [img, name, price, short_desc];
    console.log(data);
    setProductsModal((product) => [1, ...data]);
    return setShow(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://ecommerce-utm9.onrender.com/api/product"
        // {
        //   withCredentials: true,
        // }
      );
      const data = res.data.products;
      setProducts(data.splice(0, 8));
    };
    fetchData();
  }, []);

  return (
    <>
      <div className=" container-lg mt-4 ">
        <section className="position-relative px-5">
          <img src={`${banner}`} alt="" className="homeImage img-fluid" />
          <div className="container position-absolute top-50 translate-middle-y ">
            <div className="row px-lg-5 ">
              <div className="">
                <p className="text-muted text-uppercase mb-2">
                  New Inspiration 2020
                </p>
                <h1 className=" text-uppercase mb-3">20% off on new season</h1>
                <a className="btn btn-dark" onClick={() => navigate("/shop")}>
                  Browse collections
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className=" p-5">
          <header className=" text-center  text-uppercase">
            <p className=" text-black-50">Carefully created collections</p>
            <h2>Browse our categories</h2>
          </header>
          <div className=" row ">
            <div className="category col-md-6 mb-sm-2 ">
              <img
                onClick={() => navigate("/shop")}
                className=" img-fluid w-100 h-auto"
                src={`${product1}`}
                style={{ cursor: "pointer" }}
                alt=""
              />
            </div>
            <div className="category col-md-6 mb-sm-2 ">
              <img
                onClick={() => navigate("/shop")}
                className="img-fluid w-100 h-auto"
                style={{ cursor: "pointer" }}
                src={`${product2}`}
                alt=""
              />
            </div>
          </div>
          <div className=" row">
            <div className=" category col-md-6 col-lg-4">
              <img
                onClick={() => navigate("/shop")}
                className=" img-fluid"
                src={`${product3}`}
                style={{ cursor: "pointer" }}
                alt=""
              />
            </div>
            <div className="category col-md-6 col-lg-4">
              <img
                onClick={() => navigate("/shop")}
                className=" img-fluid"
                src={`${product4}`}
                style={{ cursor: "pointer" }}
                alt=""
              />
            </div>
            <div className="category col-md-6 col-lg-4">
              <img
                onClick={() => navigate("/shop")}
                className=" img-fluid"
                src={`${product5}`}
                style={{ cursor: "pointer" }}
                alt=""
              />
            </div>
          </div>
        </section>
        <section className="px-5">
          <header>
            <p className="text-muted text-uppercase mb-1">Made the hard way</p>
            <h2 className="h5 text-uppercase mb-4">Top trending products</h2>
          </header>
          <div className="row">
            {products &&
              products.map((product, index) => (
                <div key={index} className=" col-lg-3 col-md-6 col-sm-12 ">
                  <div className="category">
                    <img
                      style={{ cursor: "pointer" }}
                      className=" img-fluid image"
                      onClick={() =>
                        handleShow(
                          product.images[0],
                          product.name,
                          product.price,
                          product.short_desc
                        )
                      }
                      src={product.images[0]}
                      alt=""
                    />
                  </div>
                  <div className=" px-3">
                    <p style={{ fontWeight: "600", fontStyle: "italic" }}>
                      {product.name}
                    </p>
                    <p className=" text-muted">
                      {product.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      VND
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </section>
        <Popup
          open={show}
          name={productsModal[2]}
          img={productsModal[1]}
          price={productsModal[3]}
          shortDesc={productsModal[4]}
          onClose={() => setShow(false)}
        />

        <section
          className=" bg-light d-flex justify-content-around p-5 m-3 flex-wrap"
          style={{ fontStyle: "italic" }}
        >
          <div>
            <h6 className="text-uppercase mb-1">Free shipping</h6>
            <p className="text-muted">Free shipping worlwide</p>
          </div>
          <div>
            <h6 className="text-uppercase mb-1">24 x 7 service</h6>
            <p className="text-muted">Free shipping worlwide</p>
          </div>
          <div>
            <h6 className="text-uppercase mb-1">Festival offer</h6>
            <p className="text-small mb-0 text-muted">Free shipping worlwide</p>
          </div>
        </section>
        <section className=" p-5">
          <div
            className=" d-flex flex-wrap justify-content-center"
            style={{ fontStyle: "italic" }}
          >
            <div className=" mb-2">
              <h5 className="text-uppercase">Let's be friends!</h5>
              <p className=" text-muted mb-0">
                Nisi nisi tempor consequat laboris nisi.
              </p>
            </div>
            <div className=" d-flex align-items-center">
              <input
                className=" px-1 py-2"
                type="email"
                placeholder="Enter your email address"
                aria-describedby="button-addon2"
              />

              <button
                className=" btn-dark btn-block bg-black text-white p-2"
                id="button-addon2"
                type="submit"
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Home;
