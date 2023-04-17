import React from "react";
import Sidebar from "../components/Sidebar";
import Detail from "../components/Detail";

const DetailOrder = () => {
  return (
    <div>
      <div className="row m-2">
        <div className=" col-2 shadow min-vh-100 ">
          <Sidebar />
        </div>
        <div className=" col-10 shadow-sm">
          <div className=" p-3">
            <Detail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
