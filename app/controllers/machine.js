const { validationResult } = require("express-validator");

const Machine = require("../models/machine");

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let machine = new Machine();
      machine.name = req.body.name;
      machine.status = false;

      machine.save((err, data) => {
        if (err) {
          return res.status(400).send({
            message: "Create failed",
          });
        } else {
          return res.status(200).send(data);
        }
      });
    } catch (error) {
      return res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Machine.findByIdAndUpdate(
        req.params.machineId,
        { name: req.body.name },
        { new: true },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "Update failed!",
            });
          } else {
            res.status(200).send(data);
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

exports.list = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Machine.find((err, data) => {
        if (err) {
          return res.status(400).send({
            message: "Get list machine failed",
          });
        } else {
          res.status(200).send(data);
        }
      });
    } catch (error) {
      res.status(400).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.delete = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Machine.findByIdAndDelete(req.params.machineId, null, (err, data) => {
        if (err) {
          return res.status(400).send({
            message: "Delete machine failed",
          });
        } else {
          res.status(200).send({
            message: "Machine delete successfully",
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
