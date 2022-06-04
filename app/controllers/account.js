const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Account = require("../models/account");

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Account.findOne({ username: req.body.username }, function (err, user) {
        if (user === null) {
          return res.status(400).send("Không tìm thấy tài khoản");
        } else {
          if (user.validPassword(req.body.password)) {
            return res.status(200).send(user);
          } else {
            return res.status(400).send("Sai mật khẩu");
          }
        }
      });
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let account = new Account();
      account.username = req.body.username;
      account.setPassword(req.body.password);
      account.role = "CUSTOMER";

      account.save((err) => {
        if (err) {
          return res.status(400).send({
            message: "Failed to add account.",
          });
        } else {
          return res.status(201).send({
            message: "Account register successfully.",
          });
        }
      });
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Account.findByIdAndUpdate(
        req.params.accountId,
        {
          fullname: req.body.fullname,
          phone: req.params.phone,
        },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "Update profile failed!",
            });
          } else {
            res.status(200).send({
              message: "Update profile successfully!",
            });
          }
        }
      );
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};
