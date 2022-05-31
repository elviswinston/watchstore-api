const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const Account = this.register("../models/account");

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
          return res.status(400).send({
            message: "User not found.",
          });
        } else {
          if (user.validPassword(req.body.password)) {
            return res.status(201).send({
              message: "User Logged In",
            });
          } else {
            return res.status(400).send({
              message: "Wrong Password",
            });
          }
        }
      });
    } catch (error) {
      res.status(200).send({
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

      account.save((err, account) => {
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
      res.status(200).send({
        message: "Error: " + error,
      });
    }
  }
};
