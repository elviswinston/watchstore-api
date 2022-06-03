const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    account: {
      type: mongoose.SchemaType.ObjectId,
      ref: "Account",
      require: true,
    },
    status: {
      type: String,
      require: true,
      default: "PENDING_CONFIRM",
    },
    total: {
      type: Number,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
