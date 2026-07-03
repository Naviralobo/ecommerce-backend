const express = require("express");
const { getAllProducts } = require("./controllers/productController");

// const productMock = require("./mock/products.json");

const app = express();

const productRoutes = require("./routes/product");


app.use(express.json());

app.get("/admin", (req, res) => {
  res.json({ message: "Welcome to the admin page!" });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the homepage!" });
});

// app.get("/products", (req, res) => {
//   res.json({ products: productMock.products});
// }); --->controller and route in server style 1

// app.get("/products", getAllProducts);-->controller separation style 2
app.use("/products", productRoutes);

// -->route in rote folder style 3


app.use((req, res) => {
  res.status(404).json({ error: "Page not found" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
