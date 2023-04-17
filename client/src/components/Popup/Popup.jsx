import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./Popup.css";

function Popup(props) {
  if (!props.open) return null;

  return (
    <div onClick={props.onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <img className=" img-fluid p-2" src={props.img} alt="/" />
        <div className="modalRight img-fluid">
          <p className="closeBtn" onClick={props.onClose}>
            X
          </p>
          <div className="content">
            <h4>{props.name}</h4>
            <p>
              {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
            </p>
            <p className=" text-muted">{props.shortDesc} </p>
          </div>
          <div className=" ms-4 mb-4">
            <button className="btnPrimary btn btn-dark w-50">
              <FaShoppingCart className=" pe-1 pt-1 h5" />
              View Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
