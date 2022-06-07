const { validationResult } = require("express-validator");
const cloudinary = require("../utils/cloudinary");
const Product = require("../models/Product");

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);

      let product = new Product();
      const {
        name,
        description,
        sku,
        origin,
        sex,
        brand_id,
        glass_id,
        machine_id,
        strap_id,
        dial_diameter,
        dial_thickness,
        dial_color,
        price,
        quantity,
      } = JSON.parse(req.body.data);

      product.name = name;
      product.description = description;
      product.sku = sku;
      product.origin = origin;
      product.sex = sex;
      product.brand = brand_id;
      product.machine = machine_id;
      product.strap = strap_id;
      product.glass = glass_id;
      product.dial_diameter = dial_diameter;
      product.dial_thickness = dial_thickness;
      product.dial_color = dial_color;
      product.price = price;
      product.quantity = quantity;
      product.image = result.secure_url;
      product.cloudinary_id = result.public_id;

      product.save((err, product) => {
        if (err) {
          return res.status(400).send({
            message: "Create failed",
          });
        } else {
          return res.status(201).send({
            message: "Product added successfully.",
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

exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Product.findByIdAndUpdate(
        req.params.productId,
        {
          name: req.body.name,
          description: req.body.description,
          sku: req.body.sku,
          origin: req.body.origin,
          sex: req.body.sex,
          brand: req.body.brand_id,
          glass: req.body.glass_id,
          machine: req.body.machine_id,
          strap: req.body.strap_id,
          dial_diamete: req.body.dial_diameter,
          dial_thickness: req.body.dial_thickness,
          dial_color: req.body.dial_color,
          price: req.body.price,
          quantity: req.body.quantity,
        },
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
      Product.find()
        .lean()
        .populate("brand", "name")
        .populate("glass", "name")
        .populate("machine", "name")
        .populate("strap", "name")
        .exec((err, data) => {
          if (err) {
            return res.status(400).send({
              message: "Get list product failed",
            });
          } else {
            data = data.map((item) => ({
              ...item,
              brand: item.brand.name,
              glass: item.glass.name,
              machine: item.machine.name,
              strap: item.strap.name,
            }));

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

exports.listAll = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Product.find((err, data) => {
        if (err) {
          return res.status(400).send({
            message: "Get list product failed",
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

exports.listByBrand = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Product.find({ brand: req.body.brand_id }, (err, data) => {
        if (err) {
          return res.status(400).send({
            message: "Get list product failed",
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
