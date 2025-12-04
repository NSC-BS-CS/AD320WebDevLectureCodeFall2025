import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Rental = sequelize.define("Rental", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  price: DataTypes.STRING,
  location: DataTypes.STRING,
  img: DataTypes.STRING,
  description: DataTypes.STRING,
});

export default Rental;
