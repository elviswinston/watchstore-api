const mongoose = require("mongoose");

const BrandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      require: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Brand", BrandSchema);
