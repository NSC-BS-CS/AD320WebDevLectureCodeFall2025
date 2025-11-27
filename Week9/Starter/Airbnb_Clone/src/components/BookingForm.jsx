import React from "react";
import { useState } from "react";

const BookingForm = ({ rentals }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    date: "",
    guests: "",
    rental: "",
  });

  // Handle changes for all inputs
  const handleChange = (event) => {};

  // Handle form submission
  const handleSubmit = (event) => {};

  return (
    <div>
      <h2>Book a Stay</h2>
      <form>
        <label>
          Rental:
          <select name="rental">
            {rentals.map((r) => (
              <option value={r}>{r}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Date: Number of Guests:
          <input name="guests" type="number" min="1" />
        </label>
        <br />
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
