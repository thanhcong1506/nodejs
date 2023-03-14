import "./dashboard.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import useFetch from "../../hooks/useFetch";

const Hotel = () => {
  const bookedStyles = {
    backgroundColor: "#F69685",
    padding: "4px 2px",
    borderRadius: "5px",
  };
  const { data, loading, error } = useFetch("/transactions");
  console.log(data);
  return (
    <div>
      <Navbar />
      <Header type={"list"} />
      <div className="dContainer">
        <div className="dWrapper">
          <h1 className="dtitle">Your Transactions</h1>
          <div className="dTable">
            <table id="customers">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Hotel</th>
                  <th>Room</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, i) => (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{item.hotel} </td>
                      <td>{item.rooms.join(", ")}</td>
                      <td>
                        {item.dateStart
                          .replace(/T.*/, "")
                          .split("-")
                          .reverse()
                          .join("/")}{" "}
                        -{" "}
                        {item.dateEnd
                          .replace(/T.*/, "")
                          .split("-")
                          .reverse()
                          .join("/")}
                      </td>
                      <td>{item.price}</td>
                      <td>{item.payment}</td>
                      <td>
                        <span style={bookedStyles}>{item.status}</span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <MailList />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
