import { HeaderBanner } from "./components/HeaderBanner.jsx";
import { useState } from "react";
import BookingForm from "./components/BookingForm.jsx";
import Rentals from "./components/Rentals.jsx";
import "./App.css";

function App() {
  const [toggleBookingForm, setToggleBookingForm] = useState(false);
  const [rentals, setRentals] = useState([]);
  const [searchRentals, setSearch] = useState([]);
  //Adding State to handle Pagenation

  //UseEffect
  //Will run during inital component mount, and wehn page is updated

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

  //Fetch handler
  const getRentals = async () => {
    //If our promise fails, the catch block will run and return an error.
    try {
      const res = await fetch(`http://localhost:3000/rentals`);
      const data = await res.json();
      setRentals(data.rentals);
      setSearch(data.rentals);
    } catch (err) {
      console.error("Error fetching rentals", err);
    }
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

      {/* Our back and next buttons will trigger the update for page, and disable if we are on the first and last pages */}

      <Rentals rentals={searchRentals} />
    </div>
  );
}

export default App;
