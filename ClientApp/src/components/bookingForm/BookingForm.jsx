import React, { useContext, useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";

import "./bookingForm.css";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const BookingForm = ({ setOpen, hotelId, hotelName }) => {
  const location = useLocation();
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  //console.log(data);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { user } = useContext(AuthContext);
  const { options } = useContext(SearchContext);

  const [info, setInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    idNumber: "",
  });
  const [datesInRange, setDatesInRange] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bookedRooms, setBookedRooms] = useState([]);
  const [roomsOfHotel, setRoomsOfHotel] = useState([]);
  const [roomNumber, setRoomNumber] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  console.log(bookedRooms);
  const [date, setDate] = useState([
    {
      startDate: location.state.data[0].startDate,
      endDate: location.state.data[0].endDate,
      key: "selection",
    },
  ]);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime()) + 1;
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(date[0].endDate, date[0].startDate);

  useEffect(() => {
    const startDate = date[0].startDate;
    const endDate = date[0].endDate;
    const getRoomsOfHotel = async () => {
      setRoomsOfHotel(data);
    };
    // calculate date range
    const getDatesInRange = () => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const date = new Date(start.getTime());

      const dates = [];

      while (date <= end) {
        dates.push(new Date(date).getTime());
        date.setDate(date.getDate() + 1);
      }

      setDatesInRange(dates);
    };
    // getRoomsOfHotel();
    if (endDate.getTime() != startDate.getTime()) {
      getRoomsOfHotel();
      getDatesInRange();
    }
  }, [date]);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      datesInRange.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    const reserveData = {
      user: user,
      info: info,
      hotel: hotelName,
      rooms: bookedRooms,
      dateStart: date[0].startDate,
      dateEnd: date[0].endDate,
      price: totalPrice,
      payment: paymentMethod,
      status: "Booked",
    };
    console.log(reserveData);
    try {
      // await Promise.all(
      //   selectedRooms.map((roomId) => {
      //     const res = axios.put(`/rooms/availability/${roomId}`, {
      //       dates: datesInRange,
      //     });

      //     return res.data;
      //   })
      // );
      await axios.post("/transactions", reserveData);
      setOpen(false);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Do not empty!");
    }
  };

  const calTotalPrice = (price, isBookingMore) => {
    const bookingDays = days;
    if (isBookingMore) {
      totalPrice += price * bookingDays;
    } else {
      totalPrice -= price * bookingDays;
    }
    setTotalPrice(totalPrice);
  };

  ///////////////////////////////////////////

  const handleEvent = (event) => {
    // console.log("event:", event.target);
    const target = event.target;
    if (target.type === "checkbox") {
      return {
        value: target.value,
        checked: target.checked,
      };
    } else {
      return {
        name: target.name,
        value: target.value,
      };
    }
  };
  //////////////////////
  const handleRoomPicking = (event, price) => {
    const { value, checked } = handleEvent(event);

    setBookedRooms(
      checked
        ? [...bookedRooms, value]
        : bookedRooms.filter((item) => item !== value)
    );
    setRoomNumber();
    calTotalPrice(price, checked);
  };
  console.log(bookedRooms);
  ////////////////////////////////////////////////
  return (
    <div className="booking">
      <div className="bContainer">
        <div className="bCalendar">
          <h1>Dates</h1>
          <div>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              minDate={new Date()}
            />
          </div>
        </div>
        <div className="bInfor">
          <form action="">
            <h1>Reserve Info</h1>
            <div className="inputWrap">
              <label htmlFor="">Your Full Name :</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full name"
                value={info.fullName}
                onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
              />
            </div>
            <div className="inputWrap">
              <label htmlFor="">Your Email :</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={info.email}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
              />
            </div>
            <div className="inputWrap">
              <label htmlFor="">Your Phone Number :</label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                value={info.phoneNumber}
                onChange={(e) =>
                  setInfo({ ...info, phoneNumber: e.target.value })
                }
              />
            </div>
            <div className="inputWrap">
              <label htmlFor="">Your Identity Cart Number :</label>
              <input
                type="text"
                name="cart"
                id="cart"
                placeholder="Cart Number"
                value={info.idNumber}
                onChange={(e) => setInfo({ ...info, idNumber: e.target.value })}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="selectRoom">
        <h2>Select Rooms</h2>
        <div className="roomItems">
          {data.map((item) => (
            <div className="roomItem">
              <div className="roomInfo" key={item._id}>
                <div className="roomTitle">{item.title}</div>
                <div className="roomDesc">{item.desc}</div>
                <div className="roomMax">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="roomPrice">${item.price}</div>
              </div>
              <div className="selectRooms">
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room" key={roomNumber._id}>
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber.number}
                      onChange={(event) => handleRoomPicking(event, item.price)}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="payment">
        <h2>
          Total Bill :<b> ${totalPrice}</b>
        </h2>

        <div className="paymentDetail">
          <div className="paymentMethod">
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              name="payment-method"
              id="payment-method"
              //onChange={(e) => handleSelect(e)}
            >
              <option value="Select Payment Method">
                Select Payment Method
              </option>
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
          <button onClick={handleClick}>Reserve Now</button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
