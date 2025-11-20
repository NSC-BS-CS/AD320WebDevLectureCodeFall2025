# Express API and Fetch

## Learning Goals

- [ ] **Understand the request response cycle**
- [ ] **Recall HTTP Requests and VERBS**
- [ ] **Configure an express server**
- [ ] **Configure an express cors**
- [ ] **Create a GET Route that returns data to the front end**
- [ ] **Create a GET one route with dynamic parameters**
- [ ] **Fetch data in a React application**
- [ ] **Update state based on API responses**

## The Request-Response Cycle

Client-server architecture is widely used in modern software development. In this model, a client application, such as a web browser on a phone, sends a request to a backend server. The server processes the request and sends a response back to the client.

![request responce cycle](assets/reqrescycle.png)

## HTTP Requests (Hypertext Transfer Protocol)

HTTP is a protocol for transferring data over the web in a client–server model. It’s language-agnostic, meaning it works with many different programming languages.

- **Request URL**: The “address” of the request where it’s being sent.
- **HTTP headers**: Extra information (metadata) that accompanies the request or response.
- **HTTP methods (verbs)**: Indicate the purpose of the request, whether you’re reading data, creating new data, updating existing data, or deleting data.
- **HTTP status codes**: Show the outcome of the request whether it succeeded or failed. A common example you may already know is **404**, which means the requested resource was not found.

Find more info on [HTTP in the MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)

## HTTP Method

As mentioned above, the HTTP method determines what action the request is asking the server to perform.

| HTTP Verb | Description                                  | Example Use Case                               |
| --------- | -------------------------------------------- | ---------------------------------------------- |
| GET       | Retrieve data from the server                | Fetching a list of restaurants                 |
| POST      | Send data to the server to create a resource | Adding a new restaurant to the database        |
| PUT       | Update an existing resource entirely         | Updating the details of an existing restaurant |
| PATCH     | Partially update an existing resource        | Changing a restaurant's hours of operation     |
| DELETE    | Remove a resource from the server            | Deleting a restaurant from the database        |

## JSON

JavaScript Object Notation (JSON) is the format used to transfer data across the web.  
It’s technically plain text, which makes it lightweight and perfect for sending data quickly.

JSON looks very similar to JavaScript object literals, but **all keys must be strings**.

```
{"name": "rose", "age": 14}
```

## Express

Here’s a cleaned up version in your voice:

Express is a JavaScript library that lets us build a server on our local machine. It can receive HTTP requests from the network and send back responses.

```
import express from "express";
import cors from "cors";
import { rentals } from "./data.js";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.get("/rentals", (req, res) => {
  res.json(rentals);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


```

## Fetch

`fetch` is a built-in function that lets you request data from a backend server.
In the previous lesson, you built a backend that serves data.
In this lesson, you’ll use that server to send data to the front end.

## How does Fetch work?

The `fetch` function is used to make **HTTP requests**. When provided with a URL (and optionally a request object), it sends a request to that address. The backend then processes the request based on the **HTTP verb** (such as GET, POST, PUT, or DELETE) and the specified endpoint.

## Fetch and Asynchronous JavaScript

An asynchronous function is a function that runs outside the normal, step-by-step flow of code execution. While it works in the background, the rest of the app keeps running. When the function finishes, its result is added back into the flow.

Think of it like this: you’re waiting in line at the checkout when you realize you left your wallet in the car. You quickly step out of line to grab your wallet while the line keeps moving. When you return, you join the line again right where you need to be.

JavaScript includes many asynchronous functions, such as `setTimeout`, `setInterval`, `readFile()`, and `writeFile()`.  
In this lesson, though, we’ll focus on a few that are specifically used to make **HTTP requests**.

The `fetch` function is one of those asynchronous tools.  
It works together with the `async` and `await` keywords to handle asynchronous operations more cleanly.

- A `fetch` request **returns a Promise**, meaning it creates a place holder object while it waits for data to be retrieved.
- While waiting for a response, the rest of our program can continue executing.
- Once the response is received, the part of the program handling the data is **reintroduced into the execution flow**.
- The **response object** contains our data and other helpful information about the response, such as the status code.
- However, we can’t access the body of the response (our actual data) directly it must be **parsed** first.
- Think of the response object like an **envelope**: it tells you where the letter came from and who it’s for, but you can’t read the contents until you open the envelope.
- - The `.json()` method is another **asynchronous** function that retrieves data from the response body.
- It must be called with the `await` keyword, just like `fetch`.
- Once parsing is complete, you’ll have access to the actual data.

```
async function getData() {

        const response = await fetch('https://example.com/resource');
        const data = await response.json();
        console.log(data);

}

getData();
```

## Demo Express

## Demo Fetch

## Demo Postman

## Your Turn

Create an Express API for your Magic 8 Ball application.

Starter code and instructions are located in the Activity.

### Stretch goal

Add a fetch request to your Magic 8 Ball app from last week that makes a request to `http://localhost:3000/rentals`.
