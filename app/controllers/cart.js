const { validationResult } = require("express-validator");

const Cart = require("../models/cart");
const Product = require("../models/product");

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      let cart = new Cart();
      cart.product = req.body.product_id;
      cart.account = req.body.account_id;
      cart.amount = req.body.amount;

      cart.save((err, Cart) => {
        if (err) {
          return res.status(400).send({
            message: "Create failed",
          });
        } else {
          return res.status(201).send({
            message: "Cart added successfully.",
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

exports.updateAmount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      const cart = await Cart.findById(req.body.cartId).exec();
      cart.populated("account");

      const product = await Product.findById(cart.product).exec();
      if (product.quantity < req.boy.amount) {
        return res.status(200).send({
          status: -1,
          message: "Sản phẩm đã hết hàng",
        });
      }

      Cart.findByIdAndUpdate(
        req.params.cartId,
        { amount: req },
        (err, cart) => {
          if (err) {
            return res.status(400).send({
              message: "Update failed",
            });
          } else {
            return res.status(201).send({
              message: "Cart update successfully.",
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

exports.delete = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Cart.findByIdAndDelete(req.body.cartId, null, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: "Delete failed",
          });
        } else {
          return res.status(201).send({
            message: "Cart delete successfully.",
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

exports.list = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Cart.find({ account: req.params.accountId }, (err, data) => {
        if (err) {
          return res.status(400).send({
            message: "Get list cart failed",
          });
        } else {
          return res.status(200).send(data);
        }
      });
    } catch (error) {
      res.status(200).send({
        message: "Error: " + error,
      });
    }
  }
};
