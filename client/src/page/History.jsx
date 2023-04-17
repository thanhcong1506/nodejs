import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";
import { AiOutlineArrowRight } from "react-icons/ai";

const History = () => {
  const [userOrder, setUserOrder] = useState([]);
  const navigate = useNavigate();
  const currentUserId = JSON.parse(localStorage.getItem("currentUser"))._id;

  useEffect(() => {
    const fetchData = async () => {
      const res = await newRequest.get(`/order/${currentUserId}`);
      setUserOrder(res.data);
    };
    fetchData();
  }, []);

  const handleView = (id) => {
    navigate(`${id}`);
  };
  return (
    <div className=" container ">
      <div className=" m-5 py-5 bg-light">
        <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
          <div className="col-lg-6">
            <h1 className="h2 text-uppercase mb-0">HISTORY</h1>
          </div>
          <div className="col-lg-6 text-lg-right">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                <li>
                  <Link className=" text-decoration-none text-black" to="/">
                    HOME{" "}
                  </Link>
                  <span className=" fw-bold">&ensp;/</span>
                </li>

                <li className=" text-black-50">&ensp;HISTORY</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className=" mx-5">
        <table className="table table-hover">
          <thead className="bg-light w-100">
            <tr>
              <th className=" text-center" scope="col">
                ID ORDER
              </th>
              <th className=" text-center" scope="col">
                ID USER
              </th>
              <th className=" text-center" scope="col">
                NAME
              </th>
              <th className=" text-center" scope="col">
                PHONE
              </th>
              <th className=" text-center" scope="col">
                ADDRESS
              </th>
              <th className=" text-center" scope="col">
                TOTAL
              </th>
              <th className=" text-center" scope="col">
                STATUS
              </th>
              <th className=" text-center" scope="col">
                DETAIL
              </th>
            </tr>
          </thead>
          <tbody>
            {userOrder &&
              userOrder.map((order) => (
                <tr key={order._id}>
                  <td className="align-middle">{order._id}</td>
                  <td className="align-middle">{order.userId}</td>
                  <td className="align-middle">{order.name}</td>
                  <td className="align-middle">{order.phone}</td>
                  <td className="align-middle">{order.address}</td>
                  <td className="align-middle">
                    {order.totalBill.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td className="align-middle">{order.status}</td>
                  <td className="align-middle">
                    <button
                      onClick={() => handleView(order._id)}
                      className="btn btn-outline-dark"
                    >
                      <span className=" pe-1">View</span>
                      <AiOutlineArrowRight />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
