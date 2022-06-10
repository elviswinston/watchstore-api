const { validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");

const Order = require("../models/order");
const OrderItem = require("../models/orderItem");

exports.all = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Order.find((err, data) => {
        if (err) {
          return res.status(400).send({
            message: "Get list order failed",
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

exports.list = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Order.find({ account: req.params.accountId }, (err, data) => {
        if (err) {
          return res.status(400).send({
            message: "Get list order failed",
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

exports.detail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      OrderItem.find({ order: req.params.orderId })
        .populate("Product")
        .exec((err, data) => {
          if (err) {
            return res.status(400).send({
              message: "Get list order item failed",
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

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      var order = new Order();
      order.account = req.body.account_id;
      order.type = req.body.type;
      order.address = req.body.address;
      order.total = req.body.total;

      order.save((err, Order) => {
        if (err) {
          return res.status(400).send({
            message: "Create failed",
          });
        } else {
          req.body.list_item.forEach(async (item) => {
            var order_item = new OrderItem();
            order_item.order = Order.id;
            order_item.name = item.name;
            order_item.amount = item.amount;
            order_item.price = item.price;
            order_item.image = item.image;

            var product = await mongoose
              .model("Product")
              .findByIdAndUpdate(item.product_id)
              .exec();
            product.quantity = product.quantity - order_item.amount;

            mongoose.model("Cart").findByIdAndDelete(item.cart_id).exec();

            product.save();
            order_item.save();
          });
        }
      });

      return res.status(200).send({
        message: "Success",
      });
    } catch (error) {
      res.status(200).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.confirm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Order.findByIdAndUpdate(
        req.params.orderId,
        { status: "PENDING_SHIP" },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "Update failed",
            });
          } else {
            return res.status(201).send({
              message: "Order update successfully.",
            });
          }
        }
      );
    } catch (error) {
      res.status(200).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.delivery = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Order.findByIdAndUpdate(
        req.params.orderId,
        { status: "SHIPPING" },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "Update failed",
            });
          } else {
            return res.status(201).send({
              message: "Order update successfully.",
            });
          }
        }
      );
    } catch (error) {
      res.status(200).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.success = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Order.findByIdAndUpdate(
        req.params.orderId,
        { status: "SUCCESS" },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "Update failed",
            });
          } else {
            return res.status(201).send({
              message: "Order update successfully.",
            });
          }
        }
      );
    } catch (error) {
      res.status(200).send({
        message: "Error: " + error,
      });
    }
  }
};

exports.cancel = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: errors.array(),
    });
  } else {
    try {
      Order.findByIdAndUpdate(
        req.params.orderId,
        { status: "CANCEL" },
        (err, data) => {
          if (err) {
            return res.status(400).send({
              message: "Update failed",
            });
          } else {
            return res.status(201).send({
              message: "Order update successfully.",
            });
          }
        }
      );
    } catch (error) {
      res.status(200).send({
        message: "Error: " + error,
      });
    }
  }
};
