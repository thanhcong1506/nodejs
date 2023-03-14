import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewHotel = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch("/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newhotel = {
        ...info,
        rooms,
      };
      await axios.post("/hotels", newhotel);
      alert("Add hotel successful.");
      navigate("/hotels");
    } catch (err) {
      alert("add hotel failed. Do not empty !!!");
      console.log(err);
    }
  };
  console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                  {error && (
                    <span style={{ color: "red" }}>{error.message}</span>
                  )}
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
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

// import "./newHotel.scss";
// import Sidebar from "../../components/sidebar/Sidebar";
// import { useState } from "react";
// import { hotelInputs } from "../../formSource";
// import useFetch from "../../hooks/useFetch";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const NewHotel = () => {
//   const navigate = useNavigate();
//   const [info, setInfo] = useState({});
//   const [rooms, setRooms] = useState([]);

//   const { data, loading, error } = useFetch("/rooms");

//   const handleChange = (e) => {
//     setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const handleSelect = (e) => {
//     const value = Array.from(
//       e.target.selectedOptions,
//       (option) => option.value
//     );
//     setRooms(value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const newhotel = {
//         ...info,
//         rooms,
//       };
//       await axios.post("/hotels", newhotel);
//       navigate("/hotels");
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   console.log(info);
//   return (
//     <div className="new">
//       <Sidebar />
//       <div className="newContainer">
//         <div className="top">
//           <h1>Add New Product</h1>
//         </div>
//         <div className="bottom">
//           <div className="right">
//             <form onSubmit={handleSubmit}>
//               {hotelInputs.map((input) => (
//                 <div className="formInput" key={input.id}>
//                   <label>{input.label}</label>
//                   <input
//                     id={input.id}
//                     onChange={handleChange}
//                     type={input.type}
//                     placeholder={input.placeholder}
//                   />
//                   {error && (
//                     <span style={{ color: "red" }}>{error.message}</span>
//                   )}
//                 </div>
//               ))}
//               <div className="formInput">
//                 <label>Featured</label>
//                 <select id="featured" onChange={handleChange}>
//                   <option value={false}>No</option>
//                   <option value={true}>Yes</option>
//                 </select>
//               </div>
//               <div className="selectRooms">
//                 <label>Rooms</label>
//                 <select id="rooms" multiple onChange={handleSelect}>
//                   {loading
//                     ? "loading"
//                     : data &&
//                       data.map((room) => (
//                         <option key={room._id} value={room._id}>
//                           {room.title}
//                         </option>
//                       ))}
//                 </select>
//               </div>
//               <button type="submit">Send</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewHotel;
