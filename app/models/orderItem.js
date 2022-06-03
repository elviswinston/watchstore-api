const mongoose = require("mongoose");

const OrderItemSchema = mongoose.Schema(
  {
    order: {
      type: mongoose.SchemaType.ObjectId,
      ref: "Account",
      require: false,
      default: null,
    },
    product: {
      type: mongoose.SchemaType.ObjectId,
      ref: "Product",
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("OrderItem", OrderItemSchema);
