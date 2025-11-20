import express from "express";
import cors from "cors";
import { rentals } from "./data.js";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.get("/rentals", (req, res) => {
  // Added query params to rentals
  // This means we can add ?limit= and ?page=
  // to the end of our route to specify a more specific action
  const limit = parseInt(req.query.limit, 10);
  const page = parseInt(req.query.page, 10);

  const total = rentals.length;
  const start = (page - 1) * limit;
  const end = start + limit;

  const sliced = rentals.slice(start, end);

  res.json({
    rentals: sliced,
    page,
    totalRentals: total,
    totalPages: Math.ceil(total / limit),
  });
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
