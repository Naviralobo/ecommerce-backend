import express from "express";
import path from "path";

import productRoutes from "./routes/product";
import uploadRoutes from "./routes/upload";
import userRoutes from "./routes/user";
import dashboardRoutes from "./routes/dashboard";
import authRoutes from "./routes/auth";

import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler);

app.get("/admin", (_, res) => {
  res.json({
    message: "Welcome to the admin page!",
  });
});

app.use("/products", productRoutes);
app.use("/upload", uploadRoutes);
app.use("/users", userRoutes);
app.use("/dashboard", dashboardRoutes);
app.use(authRoutes);

app.use((_, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
