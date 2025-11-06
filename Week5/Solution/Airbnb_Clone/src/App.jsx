import { HeaderBanner } from "./components/HeaderBanner.jsx";
import { useState } from "react";
import BookingForm from "./components/BookingForm.jsx";
import Rentals from "./components/Rentals.jsx";
import "./App.css";

import { rentals } from "./data/data.js";

function App() {
  const [toggleBookingForm, setToggleBookingForm] = useState(false);

  const [searchRentals, setSearch] = useState(rentals);

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

  return (
    <div className="App">
      <HeaderBanner />

      <input type="text" placeholder="Search..." onChange={handleSearch} />

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
