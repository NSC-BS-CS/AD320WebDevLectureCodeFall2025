import React from "react";
import RentalCard from "./RentalCard.jsx";

const Rentals = ({ rentals, handleUpdateRental, deleteRental }) => {
  return (
    <div className="rentals-grid">
      {rentals.map((rental, index) => (
        <div className="rental-item" key={index}>
          <RentalCard
            rental={rental}
            handleUpdateRental={handleUpdateRental}
            deleteRental={deleteRental}
          />
        </div>
      ))}
    </div>
  );
};

export default Rentals;
