const express = require("express");

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
  });
});

router.get("/products/new", (req, res) => {
  res.render("product-form", {
    title: "Add Product",
  });
});

module.exports = router;
