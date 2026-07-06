const express = require("express");

const router = express.Router();
const controller = require("../controllers/productController");

router.get("/", controller.getAllProducts);

router.get("/:id", controller.getProductById);

router.post("/", controller.createProduct);

router.put("/:id", controller.updateProduct);

router.patch("/:id", controller.patchProduct);

router.delete("/:id", controller.deleteProduct);

module.exports = router;
