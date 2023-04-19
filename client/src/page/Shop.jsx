import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import Search from "../components/Search";
import SortProduct from "../components/SortProduct";
import useFetch from "../utils/usFfetch";

const Shop = () => {
  const [category, setCategory] = useState([
    {
      cate: "IPHONE & MAC",
      child: ["IPhone", "IPad", "Macbook"],
    },
    {
      cate: "WIRELESS",
      child: ["Airpod", "Watch"],
    },
    {
      cate: "OTHER",
      child: ["Mouse", "Keyboard", "Other"],
    },
  ]);

  const { data } = useFetch("https://ecommerce-utm9.onrender.com/api/product");
  const [products, setProducts] = useState([]);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (filter === "all") {
      setProducts(data.products);
    } else {
      const req = data.products.filter((pr) => pr.category === filter);
      setProducts(req);
    }
  }, [filter, data.products]);

  return (
    <div>
      <div className="container">
        <div className=" m-5 py-5 bg-light">
          <div className="container">
            <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
              <div className="col-lg-6">
                <h1 className="h2 text-uppercase mb-0">Shop</h1>
              </div>
              <div className="col-lg-6 text-lg-right">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                    <li className="breadcrumb-item active" aria-current="page">
                      Shop
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="row m-5">
          <div className="col-lg-3 order-2 order-lg-1 ">
            <h5 className="text-uppercase mb-4 fst-italic">Categories</h5>
            <p className=" bg-black text-white px-4 py-2">APPLE</p>

            <div className="px-4">
              <div className="shop__childen" style={{ margin: "15px 0px" }}>
                <span className=" text-muted" onClick={() => setFilter("all")}>
                  All
                </span>
              </div>
            </div>
            {category.map((cate, index) => (
              <div key={index}>
                <div className=" bg-light px-4 py-2 fw-bold fst-italic">
                  <span>{cate.cate}</span>
                </div>
                <div className=" px-4 py-2">
                  {cate.child.map((child, index) => (
                    <div key={index} className=" py-2">
                      <span
                        onClick={() => setFilter(child.toLocaleLowerCase())}
                      >
                        {child}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
            <div className="row mb-3 align-items-center">
              <Search />
              <div className="col-lg-8">
                <ul className="list-inline d-flex align-items-center justify-content-lg-end mb-0">
                  <li className="list-inline-item">
                    <SortProduct />
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row">
                {products &&
                  products
                    .slice(0, 8)
                    .map((i) => <ProductList i={i} key={i._id} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
