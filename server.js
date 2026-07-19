const express = require("express");
const mongoose = require("mongoose");

const path = require("path");
const { getAllProducts } = require("./controllers/productController");

const app = express();

const productRoutes = require("./routes/product");
const uploadRoutes = require("./routes/upload");
const userRoutes = require("./routes/user");
const dashboardRoutes = require("./routes/dashboard");
const authRoutes = require("./routes/auth");

require("dotenv").config();

app.set("view engine", "pug");//set pug as template engine
app.set("views", path.join(__dirname, "views"));//from where to access template engines

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/admin", (req, res) => {
  res.json({ message: "Welcome to the admin page!" });
});

app.use("/products", productRoutes);
app.use("/upload", uploadRoutes);
app.use("/users",userRoutes)
app.use("/dashboard",dashboardRoutes)
app.use(authRoutes)

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
    console.log("Error connecting to MongoDB:", process.env.MONGO_DB_URL);
  });

//To run terraform
//   terraform init
// terraform plan -var="github_repo=your-github-username/your-repo-name"
// terraform apply -var="github_repo=your-github-username/your-repo-name"

// set these values before running terraform
// export TF_VAR_render_api_key="your_render_api_key" in terraform.tfvars.example file
