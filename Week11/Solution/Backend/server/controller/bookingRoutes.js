import express from "express";
import Booking from "../models/Booking.js";

const bookingsRouter = express.Router();

bookingsRouter.get("/", async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

bookingsRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.error("Get one error:", error);
    res.status(500).json({ error: "Server error retrieving booking" });
  }
});

bookingsRouter.post("/", async (req, res) => {
  try {
    const newBooking = await Booking.create({
      name: req.body.name,
      date: req.body.date,
      guests: req.body.guests,
      rental: req.body.rental,
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error creating booking" });
  }
});

bookingsRouter.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const booking = await Booking.findByPk(id);

  await booking.update({
    name: req.body.name,
    date: req.body.date,
    guests: req.body.guests,
    rental: req.body.rental,
  });

  res.json(booking);
});

bookingsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const booking = await Booking.findByPk(id);

  await booking.destroy();

  res.json({ message: "Booking Deleted!" });
});

export default bookingsRouter;
