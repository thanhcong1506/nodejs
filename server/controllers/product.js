import Product from "../models/Product.js";
import createError from "../utils/createError.js";

export const createProduct = async (req, res, next) => {
  if (!req.isAdmin)
    return next(createError(403, "Only admin can create a product!"));

  const newProduct = new Product({
    userId: req.userId,
    ...req.body,
  });

  try {
    const saveProduct = await newProduct.save();
    res.status(201).json(saveProduct);
  } catch (err) {
    next(err);
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product.userId !== req.userId)
      return next(
        createError(403, "You are not admin, you can delete only your product!")
      );

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted!");
  } catch (err) {
    next(err);
  }
};
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) next(createError(404, "Product not found!"));
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
};
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      // .populate("category")
      //   .select("-photo")
      // .limit(8)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "All Product List",
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  if (!req.isAdmin)
    return next(createError(403, "Only admin can update a product!"));
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateProduct);
  } catch (err) {
    next(err);
  }
};
