# Forms and Post

## Learning Goals

- [ ] **Recall the request response cycle**
- [ ] **Recall HTTP Requests and VERBS**
- [ ] **Configure a backend create route**
- [ ] **Retreave data from a request object**
- [ ] **Create a Post request sending data to the backend**
- [ ] **Create an controlled form**
- [ ] **Control form data in state**

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

## Create Route

A create route recives data from the frontend, to create a resource in the backend. The data can be accessed via the request object in express.

```
app.post("/rentals", (req, res) => {
  const newRental = {
    id: rentals.length + 1,
    name: req.body.name,
    price: req.body.price,
    location: req.body.location,
    img: req.body.img,
    description: req.body.description,
  };
  console.log(newRental);
  rentals.push(newRental);
  res.status(201).json(newRental);
});
```

## POST request

When creating a fetch request that sends a POST, we need a bit more setup compared to a regular fetch.

The async and await parts stay the same, but the fetch call now takes two arguments:

1. The **URL**
2. A **request object**

This request object can hold a lot of information, but we only need a few essentials:

- **method**: set to `"POST"` so the backend knows what kind of request we're making.
- **headers**: metadata about the request. Here, we use it to tell the server what kind of data we’re sending.
- **body**: the actual data we're sending. Since the backend expects JSON, we convert our data using `JSON.stringify()`.

This structure lets us correctly send data from the frontend to the backend.

```
export async function genericPost(url, body) {=
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return await res.json();

}
```

## Forms

There are many ways to send data to a backend, but one of the most
common is through forms.

In React, we have **controlled** and **uncontrolled** forms. An
uncontrolled form relies on the browser’s built-in HTML behavior.
HTML existed before JavaScript, so forms originally handled sending
data on their own without fetch requests.

```
//A form in JSX
// Type is the type of data the input handles
// name is an identifier for the input, kind of like an id.
  <form>
      <label>
        Book Title:
        <input type="text" name="title" />
      </label>

      <label>
        Author:
        <input type="text" name="author" />
      </label>

      <label>
        Genre:
        <input type="text" name="genre" />
      </label>

      <input type="submit" value="Submit" />
    </form>

```

For controlled forms, we use React state to manage what appears in
each input. We update state with an `onChange` event, which gives us
the target element and the value the user typed. We also set each
input’s `value` from state so we always know what’s on the form.

```
function FavoriteBookForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }


  return (
    <form>
      <label>
        Book Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>

      <label>
        Author:
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </label>

      <label>
        Genre:
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />
      </label>

      <input type="submit" value="Submit" />
    </form>
  );
}

export default FavoriteBookForm;
```

When the user submits the form, the browser will still try to refresh
the page. If that happens, we lose all of our React state. To stop
that behavior, we use `e.preventDefault()`, a method provided by the
event object.

```
function FavoriteBookForm() {
  // Other code here...

  function handleSubmit(e) {
    e.preventDefault();
    //We will eventaully send this data up to another component but for now this console.log will do
    console.log("Submitted:", formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Book Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>

      <label>
        Author:
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </label>

      <label>
        Genre:
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />
      </label>

      <input type="submit" value="Submit" />
    </form>
  );
}

export default FavoriteBookForm;
```

## Demo!!

## Your Turn

The booking form in this app is partially done.  
Finish it and make sure it renders when the user clicks **Add Booking Form**.

- Complete the `onChange` handler so it updates the values in state and on the form.
- Complete the `onSubmit` handler so it prevents the form’s default behavior and `console.log`s the form values.

### Stretch Goal

This part is **purposely vague** and has a few steps:

- On submit, add the new booking to state in `App`, and render the bookings when the **Bookings** button is clicked.
- Add a `POST` route to your backend for bookings at  
  `http://localhost:3000/bookings`.
- Add a fetch request that makes a `POST` to that route and `console.log` the request object on the backend to confirm it’s arriving.
- Add a fetch call that gets the bookings and adds them to state on page load.

### AI Transparency Note:

All content in this document was written by the instructor. AI tools were used only to clean up grammar, improve clarity, and adjust formatting. No new ideas or instructional material were generated by AI.
