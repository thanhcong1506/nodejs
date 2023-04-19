import React, { useContext, useEffect, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import { addToCart } from "../redux/cartSlice";
import newRequest from "../utils/newRequest";
import useFetch from "../utils/usFfetch";
import { toast } from "react-toastify";

const Detail = (item) => {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { data, loading, error } = useFetch(
    `https://ecommerce-utm9.onrender.com/api/product/${id}`
  );

  //Lấy tất cả sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      const res = await newRequest.get("/product");
      const data = res.data.products;
      setProducts(data.splice(0, 8));
    };
    fetchData();
  }, []);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const handleQuantityHighter = () => {
    setQuantity(quantity + 1);
  };
  const handleQuantityLower = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const [currentImage, setCurrentImage] = useState(
    data.images && data.images[0]
  );

  const handleSubmit = () => {
    if (!currentUser) {
      navigate("/login", { state: location.pathname });
    } else {
      dispatch(
        addToCart({
          ...data,
          quantity: quantity,
        })
      );
      navigate("/cart");
      toast.success("Add to cart success");
    }
  };
  return (
    <div className=" container">
      <div className=" m-5">
        <div className="row">
          <div className=" ps-5 col-lg-2 d-flex flex-column gap-2">
            <div className="  w-100">
              <img
                className=" w-50"
                src={data.images && data.images[0]}
                onClick={() => setCurrentImage(data.images[0])}
                alt=""
              />
            </div>
            <div className="  w-100 ">
              <img
                className=" w-50"
                src={data.images && data.images[1]}
                onClick={() => setCurrentImage(data.images[1])}
                alt=""
              />
            </div>
            <div className="  w-100">
              <img
                className=" w-50"
                src={data.images && data.images[2]}
                onClick={() => setCurrentImage(data.images[2])}
                alt=""
              />
            </div>
            <div className="  w-100">
              <img
                className=" w-50"
                src={data.images && data.images[3]}
                onClick={() => setCurrentImage(data.images[3])}
                alt=""
              />
            </div>
          </div>
          <div className=" col-lg-4 ">
            <img src={currentImage || (data.images && data.images[0])} alt="" />
          </div>
          <div className=" col-lg-6 d-flex flex-column gap-2 pe-5">
            <h1>{data.name}</h1>
            <p>
              {(data.price * 1).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}{" "}
            </p>
            <span>{data.short_desc}</span>
            <p className=" fw-bold fst-italic">
              CATEGORY:{" "}
              <span className=" text-muted fw-normal ">{data.category}</span>
            </p>
            <div className="quantity d-flex">
              <div
                className="quantity__input position-relative w-50 "
                style={{ height: "40px" }}
              >
                <input
                  className=" w-100 h-100 ps-2 "
                  type=""
                  name=""
                  id=""
                  placeholder="QUANTITY"
                  disabled
                />

                <div className=" position-absolute top-50 translate-middle-y end-0 pe-2 d-flex gap-2">
                  <span onClick={handleQuantityLower}>
                    <FaChevronCircleLeft />
                  </span>
                  <span>{quantity}</span>
                  <span onClick={handleQuantityHighter}>
                    <FaChevronCircleRight />
                  </span>
                </div>
              </div>
              <button
                className=" bg-black px-2 h-100 text-white "
                onClick={() => handleSubmit()}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className=" m-5">
          <button className=" bg-black p-2 my-3 text-white">DESCRIPTION</button>
          <h5 className=" fst-italic">PRODUCT DESCRIPTION</h5>
          <span style={{ whiteSpace: "pre-line" }} className=" my-5">
            {data.long_desc}
          </span>
          <br />
          <h5 className=" fst-italic my-5 ">RELATED PRODUCTS</h5>
          <div className=" row">
            {products &&
              products
                .filter(
                  (el) => el.category === data.category && el._id !== data._id
                )
                .map((pr) => <ProductList i={pr} key={pr._id} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
