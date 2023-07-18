const asyncHandler = require("express-async-handler");
const { Category } = require("../models/category");

// create category
const createCategory = asyncHandler(async (req, res) => {
  const newCategory = await new Category({
    title: req.body.title,
  });
  const saveCategory = await newCategory.save();
  res.status(200).json({ message: "Category has been added", saveCategory });
});

// delete category
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.categoryId);
  if (!category) {
    return res.status(200).json({ message: "Category is not found" });
  }
  await Category.findByIdAndDelete(req.params.categoryId);
  res.status(200).json({ message: "Category has been deleted" });
});

// delete category
const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories)
});

module.exports = {
  createCategory,
  deleteCategory,
  getAllCategory,
};
