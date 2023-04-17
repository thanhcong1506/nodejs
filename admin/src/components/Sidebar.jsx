import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { NavLink } from "react-router-dom";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      navigate("/login");
      localStorage.removeItem("user");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" mh-100 bg-white pb-3 ">
      <div className=" py-3 border-bottom" style={{ paddingLeft: "80px" }}>
        <NavLink to="/admin" style={{ textDecoration: "none" }}>
          <span className="h2">Admin</span>
        </NavLink>
      </div>

      <div>
        <ul style={{ listStyle: "none" }}>
          <p className=" title">MAIN</p>
          <NavLink to="/admin" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </NavLink>
          <p className="title">LISTS</p>
          <NavLink to="/admin/user" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </NavLink>
          <NavLink to="/admin/product" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </NavLink>
          <NavLink to="/admin/order" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Order</span>
            </li>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }}>
            <li>
              <LocalShippingIcon className="icon" />
              <span>Delivery</span>
            </li>
          </NavLink>
          <span className="title">USEFUL</span>
          <NavLink style={{ textDecoration: "none" }}>
            <li>
              <InsertChartIcon className="icon" />
              <span>Stats</span>
            </li>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }}>
            <li>
              <NotificationsNoneIcon className="icon" />
              <span>Notifications</span>
            </li>
          </NavLink>
          <p className="title">SERVICE</p>
          <NavLink style={{ textDecoration: "none" }}>
            <li>
              <SettingsSystemDaydreamOutlinedIcon className="icon" />
              <span>System Health</span>
            </li>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }}>
            <li>
              <PsychologyOutlinedIcon className="icon" />
              <span>Logs</span>
            </li>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }}>
            <li>
              <SettingsApplicationsIcon className="icon" />
              <span>Settings</span>
            </li>
          </NavLink>
          <p className="title">USER</p>
          <NavLink style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }}>
            <li onClick={handleLogout}>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
