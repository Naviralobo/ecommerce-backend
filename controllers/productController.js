const productMock = require("../mock/products.json");
const productModel = require("../models/products");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    // use only find for custom search
    // const products = await productModel.find({
    // category: "beauty"
    // });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product", error });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = new productModel(req.body); //to create we dont use any method. We just use constructor of the model and pass the data to it. It will create a new instance of the model and we can save it to the database using .save() method
    const dbResponse = await product.save(); //save the product to the database
    console.log(dbResponse); //to check the response from db about the product
    res
      .status(201)
      .json({ message: "Product created successfully", product: dbResponse }); //to send back the response to the client
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to create product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    //The client might send all the data, we only take the data we need to update. So we destructure the data from req.body
    //if FE and BE name are different, then use req.body.name and req.body.description etc. instead of destructuring
    const { id, name, description, price, category } = req.body;
    // syntax: Model.findByIdAndUpdate(id, update, options)-it finds and does save as well.Thats why we dont use .save() here
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      { id, name, description, price, category },
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// if available updates, else inserts
exports.patchProduct = async (req, res) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
      // new: true-returns the updated document instead of the original document else default is false and returns doc before updation
      // instead of new returnDocument:"after" can also be used
      // validators run only on product.save() and not findIdAndUpdate. Now we kindle validation
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({
      message: "Product patched successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to patch product" });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await productModel.findByIdAndDelete(productId);
  try {
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
