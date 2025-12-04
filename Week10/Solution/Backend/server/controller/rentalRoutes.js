import express from "express";
import Rental from "../models/Rental.js";

const rentalsRouter = express.Router();

rentalsRouter.get("/", async (req, res) => {
  console.log("hi");
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = (page - 1) * limit;

    const result = await Rental.findAndCountAll({
      limit,
      offset,
    });

    res.json({
      rentals: result.rows,
      page,
      totalRentals: result.count,
      totalPages: Math.ceil(result.count / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

rentalsRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const rental = await Rental.findByPk(id);

    if (!rental) {
      return res.status(404).json({ error: "Rental not found" });
    }

    res.json(rental);
  } catch (error) {
    console.error("Get one error:", error);
    res.status(500).json({ error: "Server error retrieving rental" });
  }
});

rentalsRouter.post("/", async (req, res) => {
  try {
    const newRental = await Rental.create({
      name: req.body.name,
      price: req.body.price,
      location: req.body.location,
      img: req.body.img,
      description: req.body.description,
    });

    console.log(newRental);

    res.status(201).json(newRental);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error creating rental" });
  }
});
export default rentalsRouter;
