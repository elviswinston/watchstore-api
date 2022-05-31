const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    account: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Account",
      require: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Cart", CartSchema);
