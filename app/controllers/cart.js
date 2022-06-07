const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const Cart = require("../models/cart");

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      const existedCart = await Cart.findOne({
        product: req.body.product_id,
      }).exec();
      if (existedCart) {
        return res.status(400).send({
          message: "Sản phẩm đã có trong giỏ hàng",
        });
      } else {
        let cart = new Cart();
        cart.product = req.body.product_id;
        cart.account = req.body.account_id;
        cart.amount = req.body.amount;

        cart.save((err, data) => {
          if (err) {
            return res.status(400).send({
              message: "Thêm vào giỏ hàng thất bại",
            });
          } else {
            return res.status(200).send({
              message: "Thêm vào giỏ hàng thành công",
            });
          }
        });
      }
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
      const cart = await Cart.findById(req.params.cartId)
        .populate("product")
        .exec();

      if (cart.product.quantity < req.body.amount) {
        return res.status(400).send({
          message: "Sản phẩm đã hết hàng",
        });
      }
      Cart.findByIdAndUpdate(
        req.params.cartId,
        { amount: req.body.amount },
        (err, data) => {
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
      Cart.find({ account: req.params.accountId })
        .lean()
        .populate("product")
        .exec((err, data) => {
          if (err) {
            return res.status(400).send({
              message: "Get list cart failed",
            });
          } else {
            data = data.map((item) => ({
              ...item,
              product_id: item.product._id,
              product_name: item.product.name,
              product_price: item.product.price,
              image: item.product.image,
            }));
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
