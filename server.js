const express = require("express");
const mongoose = require("mongoose");
const { getAllProducts } = require("./controllers/productController");

const app = express();

const productRoutes = require("./routes/product");

require("dotenv").config();

app.use(express.json());

app.get("/admin", (req, res) => {
  res.json({ message: "Welcome to the admin page!" });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the homepage!" });
});

app.use("/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Page not found" });
});

// Connect to MongoDB-always keep it just above the server
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connected to MongoDB", process.env.MONGO_DB_URL);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", process.env.MONGO_DB_URL);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
