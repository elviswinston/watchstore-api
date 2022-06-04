const { validationResult } = require("express-validator");

const Order = require("../models/order");
const OrderItem = require("../models/orderItem");

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
          req.body.list_item.forEach((item) => {
            var order_item = new OrderItem();
            order_item.order = Order.id;
            order_item.product = item.product;
            order_item.amount = item.amount;

            order_item.save();
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
        (err, order) => {
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
        (err, order) => {
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
        (err, order) => {
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
        (err, order) => {
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
