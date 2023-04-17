import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NewProduct from "./pages/NewProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateProduct from "./pages/UpdateProduct";
import UserList from "./pages/UserList";
import ListOrder from "./pages/ListOrder";
import DetailOrder from "./pages/DetailOrder";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Home />} />
          <Route path="/admin/product" element={<Home />} />
          <Route path="/admin/user" element={<UserList />} />
          <Route path="/admin/order" element={<ListOrder />} />
          <Route path="/admin/order/:id" element={<DetailOrder />} />
          <Route path="/admin/new-product" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
