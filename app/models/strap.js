const mongoose = require("mongoose");

const StrapSchema = mongoose.Schema(
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

module.exports = mongoose.model("Strap", StrapSchema);
