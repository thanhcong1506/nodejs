import Sidebar from "../components/Sidebar";
import "../App.css";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [query, setQuery] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const res = await newRequest.get("/product");
        const data = res.data.products;
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductList();
  }, []);

  const keys = ["name", "category"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };
  return (
    <div className="row m-2">
      <div className=" col-2 shadow ">
        <Sidebar />
      </div>

      <div className=" col-9 pt-5 m-auto">
        <div>
          <div className="fw-bold py-2">Products</div>
          <div className=" d-flex justify-content-between mb-3">
            <input
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="input  form-control w-25"
              placeholder="Enter search"
              name=""
              id=""
            />
            <button
              onClick={() => {
                navigate("/admin/new-product");
              }}
              className=" btn btn-outline-success "
            >
              Add new
            </button>
          </div>
          <Table data={search(product)} />
        </div>
      </div>
    </div>
  );
};

export default Home;
