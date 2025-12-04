import express from "express";
import cors from "cors";
import rentalsRouter from "./controller/rentalRoutes.js";
import sequelize from "./db.js";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Test route hit");
});

app.use("/rentals", rentalsRouter);

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
