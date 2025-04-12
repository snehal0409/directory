// src/models/category.ts
import mongoose, { Schema, models, model } from "mongoose";

const categorySchema = new Schema(
  {
    categoryKey: { type: String, required: true, unique: true },
    categoryName: { type: String, required: true },
  },
  { timestamps: true }
);

const Category = models.Category || model("Category", categorySchema);
export default Category;
