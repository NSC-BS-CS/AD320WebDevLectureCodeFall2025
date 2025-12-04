# Express API with Sequelize

## Learning Goals

- [ ] **Understand where an ORM fits in the request response cycle**
- [ ] **Understand MVC**
- [ ] **Configure Sequelize in an Express project**
- [ ] **Define a Sequelize model**
- [ ] **Replace in-memory data with database queries**
- [ ] **Create a GET route that returns data from the database**
- [ ] **Create a GET one route with dynamic parameters using Sequelize**

---

## MVC

![MVC](./assets/MVC.png)

As our applications grow in size and functionality, we need to start separating our code into specific roles. We have a little of that already with our frontend client and our backend server.

Now we are going to follow a development pattern called **Model View Controller (MVC)**.

- **View**: Our client, for example the React app
- **Model**: The representation of our data and tables
- **Controller**: The “go between” that connects requests from the view to the models and sends back responses

In this setup:

- React handles displaying data and user interaction.
- Express routes act as controllers.
- Sequelize models represent our database tables.

---

## ORMs

Our models will come from an **Object Relational Mapper (ORM)**.

Raw data in the database is just rows in tables made up of strings, numbers, booleans, etc. On its own, that is not very convenient to work with in JavaScript.

This is where ORMs come in. An ORM:

- Maps table rows to JavaScript objects
- Gives us methods to perform actions like:
  - Getting records
  - Creating records
  - Updating records
  - Deleting records

We will use **Sequelize** as our ORM.

---

## Installing Sequelize

Sequelize is an npm package, so we install it like any other dependency:

```bash
npm install sequelize sqlite3
```

Here we are using SQLite as our database, but Sequelize can work with many different databases.

---

## Connecting to the DB

To set up Sequelize we create a new `Sequelize` instance and give it a few simple settings:

- `dialect`: the type of database we are using
- `storage`: the file where our SQLite data will be saved
- `logging`: whether or not to show SQL in the console

```js
// db.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
  logging: true,
});

export default sequelize;
```

This is typically stored in its own file called `db.js`.
Once we get everything set up, a new file called `database.sqlite` will be created.

---

## Defining a Model

The model determines what the shape of the data in a table will look like.

```js
// models/Cat.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

export const Cat = sequelize.define("Cat", {
  name: DataTypes.STRING,
  age: DataTypes.INTEGER,
  breed: DataTypes.STRING,
  color: DataTypes.STRING,
  favoriteToy: DataTypes.STRING,
});
```

When we call `sequelize.sync()`, Sequelize will create a `Cats` table that matches this shape if it does not already exist.

---

## Controller

We are now going to move our routes into a folder called `controller`.
Here we can keep any number of routes for any number of resources.

```js
// controller/genericRoutes.js
import express from "express";
import Model from "../models/Model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await Model.findAll();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
```

This router:

- Handles `GET /` for this resource
- Uses `Model.findAll()` instead of an in-memory array

When we mount it in the main server file with a base path, the full route will look like `/restaurants`, `/cats`, etc.

---

## Updates to our Server

This server setup:

- Connects to the database
- Syncs all models
- Mounts the controller at `/restaurants`
- Starts the Express server only after everything is ready

```js
// index.js

import express from "express";
import cors from "cors";

// New imports
import sequelize from "./db.js";
import restaurantRoutes from "./controller/restaurantRoutes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Tell our server which routes to use
app.use("/restaurants", restaurantRoutes);

// Wrap setup in a start function to handle async
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
    console.error("Failed to connect to the database:", error);
  }
};

start();
```

## Sequalize CLI

Sequalize has a CLI tool that can help make this process a little easier
Install `npm install --save-dev sequelize-cli`

### Requirements

1. **Configure Sequelize**

   - Install the necessary packages
   - Create a `db.js` file that exports a configured Sequelize instance
   - Connect to a SQLite database file

2. **Create an `Animal` model**

   - Put this in a `models` folder
   - Your `Animal` table must have at least:
     - `name` (string)
     - `species` (string)
     - `age` (number)
   - You may add more fields if you want

3. **Sync your database in index.js**  
   Make sure your server waits for the database to connect and your models to sync before starting.

4. **Create a controller (router)**
   Create a route that returns **all animals** from the database

5. **Test your endpoint**

   - Visit the route in the browser or Postman
   - Confirm that the route returns an empty array

6. **Seed your database**

- Your seed.js file contains the data for your initial records.
- To run it, use: node server/seed.js, this should work but there may be some minor debugging.

**AI Transparency Note:**  
All content was written by the instructor. AI was used only to clean up grammar, improve clarity, and format the material.
