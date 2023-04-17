import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import newRequest from "../utils/newRequest";
import { BiArrowBack } from "react-icons/bi";

const HistoryDetail = () => {
  const [dataOrder, setDataOrder] = useState("");
  const [detailOrder, setDetailOrder] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  const currentUserId = JSON.parse(localStorage.getItem("currentUser"))._id;

  useEffect(() => {
    const fetchDataOrder = async () => {
      const res = await newRequest.get(`/order/${currentUserId}`);
      setDataOrder([res.data[0]]);
    };
    fetchDataOrder();
  }, []);

  useEffect(() => {
    const fetchDetailOrder = async () => {
      const res = await newRequest.get(`/order/history/${id}`);
      setDetailOrder(res.data.cartItems);
    };
    fetchDetailOrder();
  }, []);

  return (
    <div className=" container">
      <div className=" m-5">
        <h3>INFORMATION ORDER</h3>
        {dataOrder &&
          dataOrder.map((data) => (
            <ul className="list-unstyled text-black-50" key={data.userId}>
              <li>{`ID User : ${data.userId}`} </li>
              <li>{`Full Name : ${data.name}`}</li>
              <li> {`Phone :  ${data.phone}`}</li>
              <li>{`Address :   ${data.address}`} </li>
              <li>{`Total : ${data.totalBill}`} </li>
            </ul>
          ))}
      </div>
      <div className=" mx-5">
        <table className="table table-hover">
          <thead className="bg-light ">
            <tr>
              <th className=" text-center" scope="col">
                ID PRODUCT
              </th>
              <th className=" text-center" scope="col">
                IMAGE
              </th>
              <th className=" text-center" scope="col">
                NAME
              </th>
              <th className=" text-center" scope="col">
                PRICE
              </th>
              <th className=" text-center" scope="col">
                COUNT
              </th>
            </tr>
          </thead>
          {detailOrder &&
            detailOrder.map((detail) => (
              <tbody key={detail._id}>
                <tr>
                  <td className="align-middle text-center">{detail.product}</td>
                  <td className="align-middle w10 text-center">
                    <img className=" img-fluid " src={detail.image} alt="" />
                  </td>
                  <td className="align-middle text-center">{detail.name}</td>
                  <td className="align-middle text-center">
                    {detail.price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td className="align-middle text-center">
                    {detail.quantity}
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
      <div style={{ width: "100px" }}>
        <button
          onClick={() => {
            navigate("/history");
          }}
          className="btn btn-outline-dark mx-5 mb-2"
        >
          <BiArrowBack />
          <span className=" ps-2">Back</span>
        </button>
      </div>
    </div>
  );
};

export default HistoryDetail;
