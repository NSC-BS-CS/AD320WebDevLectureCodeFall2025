# State

## Learning goals

- [ ] Understand hooks place in the component lifecycle
- [ ] Implement useState
- [ ] Assess when to pass useState a callback

# Props Review

Let's code this part out together.
Rental is a higher order component responsible for rendering RentalCard, a presentational component.
Our data is coming in from App and must make it to the RentalCard.

# Hooks

Hooks are special functions that allow us to hook into different stages of a component's lifecycle.

Component lifecycle stages:

- Mount
- Updating
- Unmount

There are many hooks such as useState, useEffect, and useRef.

useState allows us to hook into the mounting and updating portion of a component's lifecycle. This means it can be referenced when a component is created and can trigger updates when state changes.

useState returns two variables: a state variable and a setter function.  
The state variable is a special object we use to store information. When our component renders, it can reference that variable.

The setter function changes state. When state is updated, it first changes the value of the state variable and then updates the component.  
When the component re-renders, it does so with the new value.

## Synthetic Events in React

Events are ways in which our users interact with our application, clicking, hovering, loading, scrolling, etc.  
These events exist in JavaScript and are used to update HTML. React has a wrapper around those JavaScript events to make them easier to use with JSX.

---

### Example: onClick in Vanilla JavaScript vs React

```js
// Vanilla JavaScript example
const button = document.getElementById("myButton");
button.addEventListener("click", function () {
  alert("Button clicked!");
});
```

```jsx
// React example
function App() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

---

React events are tied to a JSX element and can take a callback function that will trigger when the event fires.  
These events can also pass an object called the event object that gives us a lot of useful information, including data about the element we’re targeting.  
In the case of our input, we can use it to grab the values from the input.

---

### Example using the event object in React

```jsx
function App() {
  const handleChange = (event) => {
    console.log("Input value:", event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Type something..."
      />
    </div>
  );
}
```

## Your Turn

## Assignment: Magic 8 Ball

With a partner create a new react application.

- `npm create vite@latest my-react-app`
- `cd my-react-app`, `npm i`, `npm run dev`

## Overview

In this assignment, you will create a simple Magic 8 Ball app using React. The app will display a button, and when that button is clicked, a random phrase (the "prediction") will appear on the screen.

If the button has not been clicked yet, nothing should render except for the button.

---

## Requirements

1. Set up your component

   - Create a new React component called `Magic8Ball`.
   - Inside, use the `useState` hook to manage the current phrase being displayed.

2. Create your list of possible phrases

   ```
   const responses = [
     "Yes, definitely",
     "Ask again later",
     "Cannot predict now",
     "My sources say no",
     "Outlook good",
     "Very doubtful",
   ];
   ```

3. Add a button

   - The button text should say something like "Ask the Magic 8 Ball".
   - When the button is clicked, choose a random phrase from the array and update state to display it.

4. Render logic
   - If no phrase has been chosen yet, render only the button.
   - Once the button has been clicked, render both the button and the random phrase below it.

---

## Example Behavior

When the page first loads:

```
[ Ask the Magic 8 Ball ]
```

After the button is clicked:

```
[ Ask the Magic 8 Ball ]

"Outlook good"
```

---

## Stretch Challenges (Optional)

- Add a “Reset” button to clear the response.
- Style the app with CSS to make it look like an actual Magic 8 Ball.
- Add animations or transitions when a new phrase appears.

### AI transparency: AI was used to improve grammar and clean up formatting, but all content was written by the instructor.
