const { validationResult } = require("express-validator");

const Brand = require("../models/brand");

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let brand = new Brand();
      brand.name = req.body.name;
      brand.status = false;

      brand.save((err, brand) => {
        if (err) {
          return res.status(400).send({
            message: "Create failed",
          });
        } else {
          return res.status(201).send({
            message: "Brand added successfully.",
          });
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
      Brand.findByIdAndUpdate(
        req.params.brandId,
        { name: req.body.name },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "Update failed!",
            });
          } else {
            res.status(200).send({
              message: "Update successfully!",
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

exports.list = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Brand.find((err, data) => {
        if (err) {
          return res.status(400).send({
            message: "Get list brand failed",
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
