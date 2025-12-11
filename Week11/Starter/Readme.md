# Express Patch/Delete and Deployment

## Learning Goals

## Learning Goals

By the end of this lesson, you will be able to:

- [ ] **Refactor** a React form to support both creating a new resource and editing an existing resource.
- [ ] **Make a fetch request** to update a resource and render the updated data in the UI.
- [ ] **Make a fetch request** to delete a resource and remove the corresponding element from the React Virtual DOM.
- [ ] **Describe** the basic purpose and flow of a CI/CD pipeline.
- [ ] **Review and compare** common deployment options for modern web applications.

---

## Backend Update and Delete

In our controller routers, we will add two additional routes.  
Both routes will require an `id` as a route parameter.

- The **PATCH** route will first find the existing resource, update it using the data from the request body, and then send the updated resource back to the client.
- The **DELETE** route will find the resource and permanently remove it using Sequelize’s `destroy` method.

```
rentalsRouter.patch("/:id", async (req, res) => {
  //Find the rental
  const id = req.params.id;
  const rental = await Rental.findByPk(id);
  //Update the rental
  await rental.update({
    name: req.body.name,
    price: req.body.price,
    location: req.body.location,
    img: req.body.img,
    description: req.body.description,
  });
  //Sent rental to the client
  res.json(rental);
});

rentalsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const rental = await Rental.findByPk(id);
  console.log(rental);
  await rental.destroy();
  res.json({ message: "Rental Deleted!" });
});


```

## Back to React Froms

We will use our existing **create form** as an **edit form**, rather than creating a separate form component just for editing.

The form will receive a new prop that represents the resource to be edited. If this prop is `false` (which we will set as the default state in a higher-level component), the form will behave as a **create form** and send a **POST** request.

If a resource is passed to the form through props instead of `false` (more on that soon), the form will automatically switch to **edit mode** and send a **PATCH** request instead.

In the form itself we will control the forms state using a useEffect.

We will put the resource in our dependency array and if that resource is updated then we will update our Form Data to the resources values.

```js
useEffect(() => {
  if (resource) {
    setFormData({
      title: resource.title,
      value: resource.value,
    });
  }
}, [resource]);
```

## Selecting the resrouce to edit

### Triggering Edit Mode

We will need a function to trigger **edit mode** in the form.

- This handler will be defined in the **App** component.
- The handler will be passed down to the **ResourceCard**, where the resource is being rendered.
- The handler will be attached to an `onClick` callback on the **Edit** button.
- When the button is clicked, we will pass the resource (which is already available in the card) back up to App.
- App will then pass that resource into the form, causing it to switch into **edit mode**.

```js
//App.jsx
const handleUpdateResrouce = (resrouce) => setResrouce(resource)

//ResourceCard.jsx
<button onclick={() => handleUpdateResrouce(resource)}>Edit<button>
```

## OnSubmit - Update

### Handling Submit for Create vs. Edit

Not much will change in our `onSubmit` function. However, when the form is acting as an **edit form**, we need to make sure we send the resource to a function that triggers a **PATCH** request instead of a **POST** request.

This can be handled using either an `if` statement or a ternary expression.

For our example, we will use an **`if` statement** inside the `onSubmit` function:

- If the resource is `false`, the form is in **create mode**, and we will send the data to the **create** function.
- If the resource is not `false`, the form is in **edit mode**, and we will send the data to the **update** function.

This allows us to reuse the same form component while clearly separating create and update behavior.

```js
if (rental) {
  updateResrouce({ id: resource.id, ...formData });
} else {
  addResource(formData);
}
```

## Updating the resource

### Updating a Resource with PATCH

To update a resource on our server, we will need to use a **PATCH** request.

A PATCH request is very similar to a POST request. It also uses a request configuration object that includes:

- the HTTP method
- headers
- a request body

The main difference is the **route**. A PATCH route requires the `id` of the resource so it can be queried and updated in the database.

In our demo later, we are simply making a fetch request to retrieve our resources again, which causes the UI to re-render.

However, in most cases, it is recommended to update the resource directly in state using a `map` instead. This avoids an extra network request and provides a faster, more responsive user experience.

```js
export async function genericPatch(url, body) {
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return await res.json();
}

const updateResource = async (updatedResource) => {
  await genericPatch(`${RESOURCES_URL}/${updatedResource.id}`, updatedResource);
  setResources((prev) =>
    prev.map((resource) =>
      resource.id === updatedResource.id ? updatedResource : resource
    )
  );
};
```

## Delete

Delete will be much simpler.

We only need to retrieve the `id` from the resource and then trigger our DELETE request. After the server confirms the deletion, we can remove that resource from state so it disappears from the UI.

    ```js
    export async function genericDelete(url) {
      await fetch(url, {
        method: "DELETE",
      });
    }

    const deleteResource = async (id) => {
      await genericDelete(`${RESOURCES_URL}/${id}`);

      setResources((prev) =>
        prev.filter((resource) => resource.id !== id)
      );
    };
    ```

## CI/CD continuous integration and continuous deployment

![CI/CD Pipeline](./assets/cicd.png)
GeeksforGeeks. (2025r, August 21). What is CI/CD? GeeksforGeeks. https://www.geeksforgeeks.org/devops/what-is-ci-cd/#

You will spend more time exploring this topic in **Software Design and Implementation**, but we will cover it here at a high level. Some of you may choose to deploy your project, and if you do, it is important to be aware of best practices, even if you do not yet have all the tools or experience to implement them fully.

A **CI/CD pipeline** is considered best practice for deploying applications. In most cases, this means deploying a single branch to production. When code is pushed to that branch, it goes through a series of automated steps:

- Automated tests run to verify the application is working as expected
- A build process runs to optimize the code
- The optimized code is deployed to production

> **Note:** Tests can be written using **Jest or Mocha** for the backend and **Cypress** for the frontend. Cypress is optional, but hybrid content covering it can be found in Week 10.

Build optimization is beyond the scope of this course, but at a high level it involves transforming code into a form that is less human-readable but faster and lighter to load. **Vite** includes some build optimization by default. Other common build tools include **Parcel** and **Webpack**.

While there are more advanced tools for managing this process, we can implement a simplified version when we deploy our app.

The exact steps may vary depending on where you deploy your application, so always make sure to read the platform’s documentation.

In most deployment platforms, you will be asked to provide a **build script**, or the service will automatically look for a `build` command in your `package.json`.

### Example Build Scripts

#### Frontend Build

    ```json
    "scripts": {
      "dev": "vite",
      "build": "vite build && cypress run",
      "lint": "eslint .",
      "preview": "vite preview"
    }
    ```

#### Backend Build

> We typically do not need bundling optimization for the backend, but running tests is always a good idea.

    ```json
    "scripts": {
      "start": "nodemon server/index.js",
      "test": "jest",
      "build": "npm test"
    }
    ```

## Deployment Options

> **Note:** Some deployment platforms include their own CI/CD tooling. If you want to take advantage of those features, be sure to check the platform’s documentation.

### Vercel

https://vercel.com/kb/guide/deploying-react-with-vercel

- Quick and easy setup, especially for frontend projects
- Built-in CI/CD with GitHub integration
- Free hobby tier available (with some performance limitations)

### Heroku

https://www.heroku.com/

- General-purpose deployment platform for full-stack applications
- Supports **Node/Express backends**, databases, and background services
- Integrates with GitHub and can automatically deploy on pushes
- Uses a simple **build + run** model rather than heavy configuration
- Free tier has been removed however it has credits in the [Github Student Developer pack](https://www.heroku.com/github-students/)

### AWS

- **AWS S3** or **AWS Amplify**
- S3 is powerful but not very beginner-friendly
- Amplify is easier to use, offers GitHub integration, and provides highly customizable configuration
- Built-in CI/CD features
- Includes **$200 in credits** for new users
  > You may want to save these credits for an AWS or cloud-focused course
