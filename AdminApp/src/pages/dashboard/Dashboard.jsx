import Sidebar from "../../components/sidebar/Sidebar";
import "./dashboard.scss";
import Widget from "../../components/widget/Widget";
import Table from "../../components/table/Table";

const Dashboard = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>

        <div className="listContainer">
          <div className="listTitle">Transactions List</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
