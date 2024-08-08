console.clear();

require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
app.use(express.json());
const port = process.env?.PORT || 3000;

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("../02-store-api/db/connect");
const { router } = require("./routes/products");

const BASE_ROUTE = "/api/v1";
const productsRoute = `${BASE_ROUTE}/products`;

app.get("/", (request, res) => {
  res.status(200).send(`
    <h1>Store API</h1>
    <a href='${productsRoute}'>products route</a>
  `);
});

app.use(productsRoute, router);

async function start() {
  try {
    console.log("Trying to connect to DB...");
    const connection = connectDB(process.env.STORE_URI);
    if (connection) {
      console.log("Connected to MongoDB");
      app.listen(port, () => console.log(`App running on port ${port}`));
    }
  } catch (e) {
    console.error("Unable to connect to DB:", e);
  }
}

start();
