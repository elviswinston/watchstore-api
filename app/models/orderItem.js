const mongoose = require("mongoose");

const OrderItemSchema = mongoose.Schema(
  {
    order: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Account",
      require: false,
      default: null,
    },
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
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
