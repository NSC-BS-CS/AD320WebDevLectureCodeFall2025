import { useState, useEffect } from "react";

function RentalForm({ rental, updateRental, addRental }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    location: "",
    img: "",
    description: "",
  });

  useEffect(() => {
    if (rental) {
      setFormData({
        name: rental.name,
        price: rental.price,
        location: rental.location,
        img: rental.img,
        description: rental.description,
      });
    }
  }, [rental]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (rental) {
      updateRental({ id: rental.id, ...formData });
    } else {
      addRental(formData);
    }
    setFormData({
      name: "",
      price: "",
      location: "",
      img: "",
      description: "",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Price:
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Location:
          <input
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Image URL:
          <input
            name="img"
            type="text"
            value={formData.img}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
      </div>

      <button type="submit">Update Rental</button>
    </form>
  );
}

export default RentalForm;
