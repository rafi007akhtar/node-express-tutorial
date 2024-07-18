const express = require("express");
const app = express();
console.clear();

// basic setup
const portToListen = process?.env?.port || 3000;
app.listen(portToListen, () => {
  console.log(`App running on port ${portToListen}`);
});

// jsons to work with
const names = [{ name: "rafi" }, { name: "akhtar" }];
const { products } = require("./data");

// setup the route URLs
const API = `/api`;
const routeUris = {
  NAMES: `${API}/names`,
  PRODUCTS: `${API}/products`,
  QUERY: `${API}/query`,
};

// implement the endpoints
app.get("/", (request, res) => {
  res.status(200).send(`
    <h1>Home page</h1>
    <div>Links
      <ul>
        <li><a href="${routeUris.NAMES}">Names</a></li>
        <li><a href="${routeUris.PRODUCTS}">Products</a></li>
      </ul>
    </div>
  `);
});

// working with json data
app.get(routeUris.NAMES, (request, res) => {
  res.status(200).json(names);
});
app.get(routeUris.PRODUCTS, (request, res) => {
  res.status(200).json(products);
});

// working with params
app.get(`${routeUris.PRODUCTS}/:id`, (request, res) => {
  const id = +request.params.id;
  const filteredProduct = products.find((product) => product.id === id);
  filteredProduct
    ? res.status(200).json(filteredProduct)
    : res
        .status(404)
        .send(`<div>No product found with id ${request.params.id}.`);
});
app.get(
  `${routeUris.PRODUCTS}/:productId/reviews/:reviewId`,
  (request, res) => {
    res.status(200).send("<div>Review Ids not available yet</div>");
  }
);

// working with query params
app.get(routeUris.QUERY, (request, res) => {
  // Example URL: "/api/query?name=sofa&id=1"

  const { id, name, price } = request.query;
  if (!id && !name && !price) {
    res
      .status(400)
      .send("Invalid query. Please include at least one of id, name, price.");
    return;
  }

  let filteredProducts = [...products];
  if (id) {
    filteredProducts = filteredProducts.filter((product) => product.id === +id);
  }
  if (name) {
    filteredProducts = filteredProducts.filter(
      (product) => product.name === name
    );
  }
  if (price) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price === +price
    );
  }
  res.status(200).json(filteredProducts);
});
