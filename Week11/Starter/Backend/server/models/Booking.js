import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  date: DataTypes.STRING,
  guests: DataTypes.INTEGER,
  rental: DataTypes.STRING,
});

export default Booking;
