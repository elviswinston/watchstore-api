const { validationResult } = require("express-validator");

const Glass = require("../models/glass");

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let glass = new Glass();
      glass.name = req.body.name;
      glass.status = false;

      glass.save((err, data) => {
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
      Glass.findByIdAndUpdate(
        req.params.glassId,
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
      Glass.find((err, data) => {
        if (err) {
          return res.status(400).send({
            message: "Get list glass failed",
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
      Glass.findByIdAndDelete(req.params.glassId, null, (err, data) => {
        if (err) {
          return res.status(400).send({
            message: "Delete glass failed",
          });
        } else {
          res.status(200).send({
            message: "Glass delete successfully",
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
