import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import upload from "../utils/upload";
import newRequest from "../utils/newRequest";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productData = location.state.product;
  const id = location.pathname.split("/")[3];
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState({
    name: productData.name,
    category: productData.category,
    price: productData.price,
    images: productData.images,
    long_desc: productData.long_desc,
    short_desc: productData.short_desc,
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
      await newRequest.put(`/product/${id}`, {
        ...product,
        images: url || productData.images,
      });
      navigate("/admin");
      // console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row m-2">
      <div className=" col-2 shadow ">
        <Sidebar />
      </div>

      <div className=" w-75 m-auto mt-2 ">
        <h6 className=" fw-bold ps-3">Update Product</h6>
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
                value={product.name}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input
                defaultValue={product.category}
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
                defaultValue={product.price}
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
                defaultValue={product.short_desc}
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
                defaultValue={product.long_desc}
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
                accept="image/*"
                type="file"
                multiple
                className="border-0 "
                placeholder="Enter images"
                onChange={(e) => setImages(e.target.files)}
              />
            </div>
            <button type="submit" className=" btn btn-info">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
