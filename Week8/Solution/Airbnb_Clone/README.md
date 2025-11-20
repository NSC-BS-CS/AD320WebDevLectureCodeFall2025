# useEffect

## Learning Goals

- [ ] Understand how `useEffect` uses side effects to trigger changes in state.
- [ ] Implement `useEffect` so it runs when a component is mounted for the first time.
- [ ] Explain the purpose of the dependency array.
- [ ] Use the dependency array to run `useEffect` when one of its dependencies updates.

# Side Effects

`useEffect` is a hook named after **side effects**.  
To understand side effects, we first need to understand what a **pure function** is.

A **pure function** always produces the **same output** when given the **same input**, and it does **not** change anything outside of itself.

**Example of a pure function:**

```
function add(a, b) {
  return a + b;
}
// add(2,3) will always get 5
```

A Side effect on the other hand, is anything a function does that impacts something outside of itself, if a funciton has a side effect it's no longer considered a pure funtion. Some examples are...

- Fetching data from an API
- setTimeout

React prefers components to be pure funcitons, this helps keep rendering consistant. However there are some tasks that require side effects, most importantly for us, fetching data. That's where **useEffect** comes in. Whenever we use a funciton that has a side effect we add it to useEffect.

## useEffect Functionality

`useEffect` is a hook that takes two parameters:

1. A **callback function** (the effect)
2. A **dependency array**

The callback is what runs whenever the effect is triggered. `useEffect` can run in three situations:

- When the component **mounts** for the first time.
- When a value listed in the **dependency array** changes.
- When the component **unmounts**, but a function returned by useEffect runs at unmount time.

```
useEffect(() => {
  // this runs on mount and whenever dependencies change

  return () => {
    // this cleanup runs on unmount
  };
}, [dependencies]);
```

## The Dependency Array

`useEffect` has some quirks you need to understand.

When state updates, a component re-renders.  
If you **don’t** give `useEffect` an empty dependency array as its second argument, and you update state _inside_ the effect, React will re-run the effect every render.  
This creates an **endless loop**.

The dependency array controls **when** your effect runs.  
It can contain both state variables and non-state values.  
If **any** value inside the dependency array changes, React will trigger the effect’s callback again.

```
useEffect(() => {
  // effect code here
}, [value1, value2]);
```

## Your turn!

Fetching D&D Monsters with `useEffect`

You will create a small React app that fetches data from this API:

**https://www.dnd5eapi.co/api/2014/monsters**

Your goal is to load the monster data, save it to state, and render all the monster names on the page.  
You only need **one component** for this assignment (`App.jsx`).

### Steps

1. Create a new React app and open `App.jsx`.
2. Import `useState` and `useEffect`.
3. Create state to store the list of monsters.
4. Write a function that:
   - Calls the API URL above.
   - Converts the response to JSON.
   - Saves the monster list into state.
5. Use `useEffect` to call your function when the component mounts.
6. Render the names of all monsters in your `return` statement.
7. Confirm that the API data appears on the page.

Note: If you finish early you may meet with your team about the project.

### AI transparency: AI was used to improve grammar and clean up formatting, but all content was written by the instructor.
