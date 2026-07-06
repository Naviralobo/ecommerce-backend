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

app.use("/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Page not found" });
});

// Connect to MongoDB-always keep it just above the server
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.zp72w3s.mongodb.net/${process.env.MONGO_DB_NAME}`,
  )
  .then(() => {
    console.log("Connected to MongoDB", process.env.MONGO_DB_URL);
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
    //connect only if db connection is successful, else it will throw error and server will not start
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", process.env.MONGO_DB_URL);
  });
