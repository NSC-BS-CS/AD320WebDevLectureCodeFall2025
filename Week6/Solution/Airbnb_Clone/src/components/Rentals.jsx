import React from "react";
import RentalCard from "./RentalCard.jsx";

const Rentals = ({ rentals, saveBooking }) => {
  return (
    <div className="rentals-grid">
      {rentals.map((rental, index) => (
        <div className="rental-item" key={index}>
          <RentalCard rental={rental} saveBooking={saveBooking} />
        </div>
      ))}
    </div>
  );
};

export default Rentals;
