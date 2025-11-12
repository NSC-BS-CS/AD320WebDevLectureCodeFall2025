// Express allows us to create a server
import express from "express";
// CORS helps us bypass some browser protections
import cors from "cors";

const app = express();

// This is the port used to access your application
// If http://localhost: is your address, think of the port as a door
const port = 3000;

// This line tells our server to use CORS in our responses
app.use(cors());

// When our requests are sent to the backend, they are in JSON format
// This line automatically parses the JSON into a JavaScript object
// This will be important for our other routes later
app.use(express.json());

// 1. Define your Magic 8 Ball messages here

// 2. Create a GET route that sends the messages to the front end

// 3. Test the route in the browser at /messages
// Add: "start": "nodemon server/index.js" to the package.json scripts
// To run the server, run `npm run start` in the terminal

// This tells our server what port it is on and gives us a console.log in our terminal
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
