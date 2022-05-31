const mongoose = require("mongoose");
const crypto = require("crypto");

const AccountSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  fullname: String,
  phone: String,
  hash: String,
  salt: String,
});

AccountSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");

  this.hash = crypto
    .pbkdf2(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

AccountSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};

module.exports = mongoose.model("Account", AccountSchema);
