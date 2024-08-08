async function getAllProducts(request, res) {
  res.status(200).json([1, 2, 3]);
}

async function getAllProductsStatic(request, res) {
  res.status(200).json({ msg: "static" });
}

module.exports = { getAllProducts, getAllProductsStatic };
