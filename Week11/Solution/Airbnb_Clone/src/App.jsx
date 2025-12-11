import { useState, useEffect } from "react";
import { HeaderBanner } from "./components/HeaderBanner.jsx";
import BookingForm from "./components/BookingForm.jsx";
import Rentals from "./components/Rentals.jsx";
import AddRentalForm from "./components/AddRentalForm.jsx";
import {
  genericGet,
  genericPost,
  genericPatch,
  genericDelete,
} from "./api_calls/fetch_handlers.jsx";
import "./App.css";
const RENTALS_URL = "http://localhost:3000/rentals";

function App() {
  const [toggleBookingForm, setToggleBookingForm] = useState(false);
  const [toggleRentalForm, setToggleRentalForm] = useState(false);
  const [showBookings, setShowBookings] = useState(false);

  const [rentals, setRentals] = useState([]);
  const [searchRentals, setSearchRentals] = useState([]);
  const [editRental, setEditRental] = useState(false);

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

  //Sends rental to edit form
  const handleUpdateRental = (renatal) => {
    setEditRental(renatal);
    setToggleRentalForm((prev) => !prev);
  };

  // Add rental (now using genericPost directly)
  const addRental = async (rental) => {
    console.log("app", rental);
    const createdRental = await genericPost(RENTALS_URL, rental);

    if (!createdRental) return;
    setToggleRentalForm((prev) => !prev);
    await getRentals(page);
  };

  // Fetch rentals
  const getRentals = async (pageNum = 1) => {
    const data = await genericGet(
      `${RENTALS_URL}?limit=${RENTALS_PER_PAGE}&page=${pageNum}`
    );

    if (!data) return;

    setRentals(data.rentals || []);
    setSearchRentals(data.rentals || []);
    setTotalPages(data.totalPages || 1);
  };
  // Update Rentals
  const updateRental = async (updatedRental) => {
    try {
      const savedRental = await genericPatch(
        `${RENTALS_URL}/${updatedRental.id}`,
        updatedRental
      );
      setToggleRentalForm((prev) => !prev);

      await getRentals(page);
    } catch (err) {
      console.error("Error updating rental:", err);
    }
  };
  //Delte rentals
  const deleteRental = async (id) => {
    try {
      await genericDelete(`${RENTALS_URL}/${id}`);

      setRentals((prev) => prev.filter((rental) => rental.id !== id));
    } catch (err) {
      console.error("Error deleting rental:", err);
    }
    await getRentals(page);
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

        {toggleRentalForm && (
          <AddRentalForm
            rental={editRental}
            addRental={addRental}
            updateRental={updateRental}
          />
        )}
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

      <Rentals
        rentals={searchRentals}
        handleUpdateRental={handleUpdateRental}
        deleteRental={deleteRental}
      />
    </div>
  );
}

export default App;
