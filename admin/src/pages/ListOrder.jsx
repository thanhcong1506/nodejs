import Sidebar from "../components/Sidebar";

import DataGridOrder from "../components/DataGridUserOrder";

const ListOrder = () => {
  return (
    <div className="row m-2">
      <div className=" col-2  ">
        <Sidebar />
      </div>
      <div className=" col-10 shadow min-vh-100">
        <div className=" p-3">
          <p className=" fw-bold ps-3">List Order</p>
          <DataGridOrder />
        </div>
      </div>
    </div>
  );
};

export default ListOrder;
