const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    account: {
      type: mongoose.SchemaTypes.ObjectId,
      require: true,
      ref: "Account",
    },
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      require: true,
      ref: "Product",
    },
    content: {
      type: String,
      require: true,
    },
    star: Number,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Review", ReviewSchema);
