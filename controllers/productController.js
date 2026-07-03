const productMock = require("../mock/products.json");

exports.getAllProducts = (req, res) => {
  res.json({ products: productMock.products });
};

exports.createProduct = (req, res) => {
  res.json({ message: "Product created successfully" })
};

exports.updateProduct = (req, res) => {
  res.json({ message: "Product updated successfully" }) 
};

exports.deleteProduct = (req, res) => {
  res.json({ message: "Product deleted successfully" } )
};

exports.getProductById = (req, res) => {
  res.json({ message: `Product retrieved successfully` })
};
