import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("user");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Booking Website</span>
        </Link>
        {user ? (
          <div className="navItems">
            <p>{user.email}</p>
            <Link to="/dashboard">
              <button className="navButton">Transaction</button>
            </Link>
            <a href="/">
              <button onClick={logOut} className="navButton">
                Logout
              </button>
            </a>
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
