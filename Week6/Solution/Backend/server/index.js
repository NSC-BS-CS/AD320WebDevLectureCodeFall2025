import express from "express";
import cors from "cors";
import { rentals } from "./data.js";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.get("/rentals", (req, res) => {
  res.json(rentals);
});

app.post("/rentals", (req, res) => {
  const newRental = {
    id: rentals.length + 1,
    name: req.body.name,
    price: req.body.price,
    location: req.body.location,
    img: req.body.img,
    description: req.body.description,
  };

  rentals.push(newRental);
  res.status(201).json(newRental);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
