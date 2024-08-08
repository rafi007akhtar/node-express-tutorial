// Dynamically add / remove values to / from the DB

require("dotenv").config({});

const connectDB = require("./db/connect");
const Product = require("./models/product");
const jsonProducts = require("./products.json");

async function start() {
  try {
    await connectDB(process.env.STORE_URI);
    await Product.deleteMany({});
    await Product.create(jsonProducts);
    console.log("Products added to DB");
    process.exit(0);
  } catch (e) {
    console.error("Unable to connect to DB:", e);
    process.exit(1);
  }
}

start();
