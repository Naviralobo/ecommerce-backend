import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
// import uploadRoutes from "./routes/upload";
// import userRoutes from "./routes/user";
// import dashboardRoutes from "./routes/dashboard";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
import wishlistRoutes from "./routes/wishlist.routes";
import cartRoutes from "./routes/cart.routes";
import addressRoutes from "./routes/address.routes";
import orderRoutes from "./routes/order.routes";
import uploadRoutes from "./routes/order.routes";

import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/admin", (_, res) => {
  res.json({
    message: "Welcome to the admin page!",
  });
});

// app.use("/upload", uploadRoutes);
// app.use("/users", userRoutes);
// app.use("/dashboard", dashboardRoutes);
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/cart", cartRoutes);
app.use("/address", addressRoutes);
app.use("/order", orderRoutes);
app.use("/upload", uploadRoutes);

app.use((_, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
app.use(errorHandler);

export default app;
