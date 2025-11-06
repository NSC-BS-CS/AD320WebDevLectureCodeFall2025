const RentalCard = () => {
  return (
    <div className="rental-card">
      <div className="rental-card-header">
        <h3>{name}</h3>
        <p>{location}</p>
      </div>

      <img src={img} alt={name} width="100%" height="180" />

      <div className="rental-card-content">
        <p>${price} / night</p>
        <p>{description}</p>
      </div>

      <div className="rental-card-actions">
        <div className="rental-card-buttons">
          <button>More</button>
          <button>Save</button>
        </div>
        <div className="rental-card-icons">
          <span>♡</span>
          <span>⤴</span>
        </div>
      </div>
    </div>
  );
};

export default RentalCard;
