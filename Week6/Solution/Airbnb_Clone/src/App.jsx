import { HeaderBanner } from "./components/HeaderBanner.jsx";
import { useState } from "react";
import BookingForm from "./components/BookingForm.jsx";
import Rentals from "./components/Rentals.jsx";
import "./App.css";

function App() {
  const [toggleBookingForm, setToggleBookingForm] = useState(false);
  //Add rentals to use use state
  const [rentals, setRentals] = useState([]);

  const [searchRentals, setSearch] = useState([]);

  // Toggle booking form
  const handleToggleBookingForm = () =>
    setToggleBookingForm((prevState) => !prevState);

  const handleToggleBooking = () => setToggleBooking((prevState) => !prevState);

  // Handle search
  const handleSearch = (e) => {
    const filtered = rentals.filter((r) =>
      r.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearch(filtered);
  };

  const saveBooking = (booking) => {
    console.log(booking);
    setBookings((prev) => [...prev, booking]);
  };
  //Fetch handler
  const getRentals = async () => {
    const res = await fetch("http://localhost:3000/rentals");
    const data = await res.json();
    console.log(data);
    setRentals(data);
    setSearch(data);
  };
  console.log(rentals);
  return (
    <div className="App">
      <HeaderBanner />

      <input type="text" placeholder="Search..." onChange={handleSearch} />
      <button onClick={getRentals}>Load Rentals </button>
      <div>
        <button onClick={handleToggleBookingForm}>
          {toggleBookingForm ? "Close Form" : "Add Booking"}
        </button>
        <button onClick={handleToggleBooking}>Bookings</button>
      </div>

      {toggleBookingForm && (
        <BookingForm rentals={rentals.map((r) => r.name)} />
      )}

      <Rentals rentals={searchRentals} saveBooking={saveBooking} />
    </div>
  );
}

export default App;
