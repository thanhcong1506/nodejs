import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import upload from "../utils/upload";
import newRequest from "../utils/newRequest";
import { toast } from "react-toastify";

const NewProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    images: "",
    long_desc: "",
    short_desc: "",
  });

  const handleChange = (e) => {
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await upload(images);
    try {
      const res = await newRequest.post("/product", {
        ...product,
        images: url,
      });
      if (!res.ok) {
        throw new Error("Some thing went wrong!!");
      } else {
        setProduct(res.data);
        navigate("/admin");
        toast.success("Add product success !");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="row m-2">
      <div className=" col-2 shadow ">
        <Sidebar />
      </div>
      <div className=" col-9  m-auto">
        <div className="  m-auto  ">
          <h6 className=" fw-bold ps-3">Add New Product</h6>
          <div className=" bg-light p-3 shadow">
            <form onSubmit={handleSubmit} action="">
              <div className="mb-0">
                <label htmlFor="name" className="form-label">
                  Product Name
                </label>
                <input
                  onChange={handleChange}
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Enter Product Name"
                />
              </div>
              <div className="mb-1">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <input
                  onChange={handleChange}
                  name="category"
                  type="text"
                  className="form-control"
                  placeholder="Enter Category"
                />
              </div>
              <div className="mb-1">
                <label htmlFor="price" className="form-label">
                  price
                </label>
                <input
                  onChange={handleChange}
                  name="price"
                  type="text"
                  className="form-control"
                  placeholder="Enter Price"
                />
              </div>
              <div className="mb-1">
                <label htmlFor="short_desc" className="form-label">
                  Short Description
                </label>
                <textarea
                  onChange={handleChange}
                  name="short_desc"
                  rows="4"
                  cols="50"
                  type="text"
                  className="form-control"
                  placeholder="Enter Short Description"
                />
              </div>
              <div className="mb-1">
                <label htmlFor="long_desc" className="form-label">
                  Long Description
                </label>
                <textarea
                  onChange={handleChange}
                  name="long_desc"
                  rows="6"
                  cols="50"
                  type="text"
                  className="form-control "
                  placeholder="Enter Long Description"
                />
              </div>
              <div className="mb-1 d-flex flex-column">
                <label htmlFor="file" className="form-label">
                  Upload image (5 image)
                </label>
                <input
                  type="file"
                  multiple
                  className="border-0 "
                  placeholder="Enter images"
                  onChange={(e) => setImages(e.target.files)}
                />
              </div>
              <button type="submit" className=" btn btn-info">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
