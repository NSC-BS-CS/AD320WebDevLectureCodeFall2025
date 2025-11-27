import { useState, useEffect } from "react";
import { HeaderBanner } from "./components/HeaderBanner.jsx";
import BookingForm from "./components/BookingForm.jsx";
import Rentals from "./components/Rentals.jsx";
import AddRentalForm from "./components/AddRentalForm.jsx";
import { genericGet, genericPost } from "./api_calls/fetch_handlers.jsx";
import "./App.css";

function App() {
  const [toggleBookingForm, setToggleBookingForm] = useState(false);
  const [toggleRentalForm, setToggleRentalForm] = useState(false);
  const [showBookings, setShowBookings] = useState(false);

  const [rentals, setRentals] = useState([]);
  const [searchRentals, setSearchRentals] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const RENTALS_PER_PAGE = 5;

  // Fetch rentals on mount and when page changes
  useEffect(() => {
    getRentals(page);
  }, [page]);

  // Toggle booking form
  const handleToggleBookingForm = () => setToggleBookingForm((prev) => !prev);

  // Toggle bookings section
  const handleToggleBookings = () => setShowBookings((prev) => !prev);

  // Toggle rental admin form
  const handleToggleRentals = () => setToggleRentalForm((prev) => !prev);

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    if (!value) {
      setSearchRentals(rentals);
      return;
    }

    const filtered = rentals.filter((r) =>
      r.name.toLowerCase().includes(value)
    );

    setSearchRentals(filtered);
  };

  // Add rental (now using genericPost directly)
  const addRental = async (rental) => {};

  // Fetch rentals
  const getRentals = async (pageNum = 1) => {
    const data = await genericGet(
      `http://localhost:3000/rentals?limit=${RENTALS_PER_PAGE}&page=${pageNum}`
    );

    if (!data) return;

    setRentals(data.rentals || []);
    setSearchRentals(data.rentals || []);
    setTotalPages(data.totalPages || 1);
  };

  return (
    <div className="App">
      <HeaderBanner />

      <input type="text" placeholder="Search..." onChange={handleSearch} />

      <div>
        <button onClick={handleToggleBookingForm}>
          {toggleBookingForm ? "Close Form" : "Add Booking"}
        </button>

        <button onClick={handleToggleBookings}>
          {showBookings ? "Hide Bookings" : "Bookings"}
        </button>
      </div>

      <div>
        {toggleBookingForm && (
          <BookingForm
            addRental={addRental}
            rentals={rentals.map((r) => r.name)}
          />
        )}

        <button onClick={handleToggleRentals}>
          {toggleRentalForm ? "Close Form" : "Admin: Add Rental"}
        </button>

        {toggleRentalForm && <AddRentalForm />}
      </div>

      {/* Pagination controls */}
      <div className="pagination-buttons">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span>Page {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      <Rentals rentals={searchRentals} />
    </div>
  );
}

export default App;
