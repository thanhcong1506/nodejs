import Category from "../models/Category.js";
import slugify from "slugify";
import createError from "../utils/createError.js";
export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return next(createError(400, "Name is required"));
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return next(createError(401, "Category Already Exisits"));
    }
    const category = await new Category({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    next(error);
  }
};

//update category
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

// get all cat
export const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    next(error);
  }
};

// single category
export const getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

//delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
