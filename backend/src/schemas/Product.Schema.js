import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true, 
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, 
    },
    salePrice: {
      type: Number,
      min: 0,
      validate: {
        validator: function (value) {
          return value <= this.price; 
        },
        message: "Sale price should be less than or equal to the original price",
      },
    },
    totalStock: {
      type: Number,
      required: true,
      min: 0, 
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
