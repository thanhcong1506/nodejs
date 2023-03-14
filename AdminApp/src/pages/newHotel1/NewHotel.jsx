import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { basicSchema } from "../../schemas";

const NewHotel = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      type: "",
      city: "",
      address: "",
      distance: "",
      title: "",
      desc: "",
      price: "",
      image: "",
      // featured: "",
      rooms: [],
    },
    validationSchema: basicSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { data, loading, error } = useFetch("/rooms");
  // const handleChange = (e) => {
  //   setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  // };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const newhotel = {
  //       ...info,
  //       rooms,
  //     };
  //     await axios.post("/hotels", newhotel);
  //     navigate("/hotels");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="formInput">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="My Hotel"
                  name="name"
                  value={values.name}
                />
                {errors.name && touched.name && (
                  <p className="error">{errors.name}</p>
                )}
              </div>
              <div className="formInput">
                <label htmlFor="">Type</label>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="hotel"
                  name="type"
                  value={values.type}
                />
                {errors.type && touched.type && (
                  <p className="error">{errors.type}</p>
                )}
              </div>
              <div className="formInput">
                <label htmlFor="">City</label>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="New York"
                  name="city"
                  value={values.city}
                />
                {errors.city && touched.city && (
                  <p className="error">{errors.city}</p>
                )}
              </div>
              <div className="formInput">
                <label htmlFor="">Address</label>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="elton st, 216"
                  name="address"
                  value={values.address}
                />
                {errors.address && touched.address && (
                  <p className="error">{errors.address}</p>
                )}
              </div>
              <div className="formInput">
                <label htmlFor="">Distance from City Center</label>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="500"
                  name="distance"
                  value={values.distance}
                />
                {errors.distance && touched.distance && (
                  <p className="error">{errors.distance}</p>
                )}
              </div>
              <div className="formInput">
                <label htmlFor="">Title</label>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="The best Hotel"
                  name="title"
                  value={values.title}
                />
                {errors.title && touched.title && (
                  <p className="error">{errors.title}</p>
                )}
              </div>
              <div className="formInput">
                <label htmlFor="">Description</label>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="description"
                  name="desc"
                  value={values.desc}
                />
                {errors.desc && touched.desc && (
                  <p className="error">{errors.desc}</p>
                )}
              </div>
              <div className="formInput">
                <label htmlFor="">Price</label>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="100"
                  name="price"
                  value={values.cheapestPrice}
                />
                {errors.price && touched.price && (
                  <p className="error">{errors.price}</p>
                )}
              </div>
              <div className="formInput">
                <label htmlFor="">Image</label>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="image"
                  name="photos"
                  value={values.photos}
                />
                {errors.image && touched.image && (
                  <p className="error">{errors.image}</p>
                )}
              </div>

              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleChange}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
                {errors.rooms && touched.rooms && (
                  <p className="error">{errors.rooms}</p>
                )}
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
