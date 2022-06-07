const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    origin: {
      type: String,
      require: false,
    },
    sex: {
      type: String,
      require: false,
    },
    sku: {
      type: String,
      require: false,
    },
    brand: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Brand",
    },
    glass: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Glass",
      require: false,
    },
    machine: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Machine",
      require: false,
    },
    strap: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Strap",
      require: false,
    },
    dial_parameter: {
      type: Number,
      require: true,
    },
    dial_thickness: {
      type: Number,
      require: true,
    },
    dial_color: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    cloudinary_id: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
