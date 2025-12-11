import express from "express";
import cors from "cors";
import rentalsRouter from "./controller/rentalRoutes.js";
import bookingsRouter from "./controller/bookingRoutes.js";
import sequelize from "./db.js";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.use("/rentals", rentalsRouter);
app.use("/bookings", bookingsRouter);
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync();
    console.log("Models synced");

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Database failed to connect:", error);
  }
};

start();
