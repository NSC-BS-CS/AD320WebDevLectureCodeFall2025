import React from "react";
import RentalCard from "./RentalCard.jsx";

const Rentals = ({ rentals }) => {
  return (
    <div className="rentals-grid">
      {rentals.map((rental, index) => (
        <div className="rental-item" key={index}>
          <RentalCard rental={rental} />
        </div>
      ))}
    </div>
  );
};

export default Rentals;
