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
  let results = Product.find({
    featured: true,
  });

  let { fields, page, limit, sort } = request.query;
  sort = sort || "createdAt";
  page = +page || 1;
  limit = +limit || 10;
  const skip = (page - 1) * limit;

  results = results.sort(sort);

  if (fields) {
    fields = fields.replaceAll(",", " ");
    results = results.select(fields); // for selecting only the given keys
  }
  results = results.skip(skip).limit(limit);

  const featuredProducts = await results;

  res.status(200).json({ featuredProducts, nbHits: featuredProducts.length });
}

module.exports = { getAllProducts, getAllProductsStatic };
