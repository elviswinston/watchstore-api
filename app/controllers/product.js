const { validationResult } = require("express-validator");

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let product = new Product();
      const {
        name,
        description,
        sku,
        origin,
        sex,
        branch_id,
        glass_id,
        machine_id,
        strap_id,
        dial_diameter,
        dial_thickness,
        dial_color,
        price,
        quantity,
        image,
      } = req.body;

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
      product.dial_parameter = dial_parameter;
      product.dial_color = dial_color;
      product.price = price;
      product.quantity = quantity;

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
