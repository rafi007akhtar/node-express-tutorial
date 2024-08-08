const Product = require("../models/product");

async function getAllProducts(request, res) {
  const schemaKeys = Product.schema.obj;
  const requestedKeys = request.query;
  const searchKeys = {};
  for (let rk in requestedKeys) {
    if (rk in schemaKeys) {
      searchKeys[rk] = requestedKeys[rk];
    }
  }
  if ("name" in searchKeys) {
    searchKeys.name = { $regex: searchKeys.name, $options: "i" };
  }
  const products = await Product.find(searchKeys);
  res.status(200).json({ products, nbHits: products.length });
}

async function getAllProductsStatic(request, res) {
  const featuedProducts = await Product.find({
    featured: true,
  });
  res.status(200).json({ featuedProducts, nbHits: featuedProducts.length });
}

module.exports = { getAllProducts, getAllProductsStatic };
