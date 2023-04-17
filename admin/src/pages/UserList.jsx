import Sidebar from "../components/Sidebar";
import DataGridUser from "../components/DataGridUser";

const UserList = () => {
  return (
    <div className="row m-2">
      <div className=" col-2  ">
        <Sidebar />
      </div>
      <div className=" col-10 shadow min-vh-100">
        <div className=" p-3">
          <p className=" fw-bold pt-3">User List</p>
          <div className=" m-auto">
            <DataGridUser />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
