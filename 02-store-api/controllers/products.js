const Product = require("../models/product");

async function getAllProducts(request, res) {
  // make sure only the valid keys that are a part of the schema are passed on in the query
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

  // apply the sort; if no sort is passed, sort by the created date
  let { sort } = requestedKeys;
  sort = sort || "createdAt";
  if (sort.indexOf(",") !== -1) {
    sort = sort.replaceAll(",", " ");
  }

  const products = await Product.find(searchKeys).sort(sort);
  res.status(200).json({ products, nbHits: products.length });
}

async function getAllProductsStatic(request, res) {
  const featuedProducts = await Product.find({
    featured: true,
  });
  res.status(200).json({ featuedProducts, nbHits: featuedProducts.length });
}

module.exports = { getAllProducts, getAllProductsStatic };
