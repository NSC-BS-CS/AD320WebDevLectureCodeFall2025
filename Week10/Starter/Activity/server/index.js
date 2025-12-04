import express from "express";
import cors from "cors";
import rentalsRouter from "./controller/animalRoutes.js";
import sequelize from "./db.js";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

//Code here

start();
