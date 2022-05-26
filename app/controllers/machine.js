const { validationResult } = require("express-validator");
const { ObjectId } = require("mongodb");

const dbo = require("../db/conn");

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: errors.array(),
      message: "Validate Errors",
    });
  } else {
    try {
      const dbConnect = dbo.getDb();
      const { name } = req.body;

      dbConnect
        .collection("machines")
        .insertOne({ name, status: false }, (error, result) => {
          if (error) {
            return res.json({
              success: false,
              errors: error,
              message: "Create failed.",
            });
          }

          res.json({
            success: true,
            data: result,
            message: "Create successfully.",
          });
        });
    } catch (error) {
      res.json({
        success: false,
        errors: error,
        message: "Error happened.",
      });
    }
  }
};

exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: errors.array(),
      message: "Validate Errors",
    });
  } else {
    try {
      const dbConnect = dbo.getDb();
      const { name } = req.body;
      const _id = req.params.machineId;

      dbConnect
        .collection("machines")
        .updateOne(
          { _id: ObjectId(_id) },
          { $set: { name: name } },
          (error, result) => {
            if (error) {
              return res.json({
                success: false,
                errors: error,
                message: "Update failed.",
              });
            }

            res.json({
              success: true,
              data: result,
              message: "Update successfully.",
            });
          }
        );
    } catch (error) {
      res.json({
        success: false,
        errors: error,
        message: "Error happened.",
      });
    }
  }
};

exports.updateStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: errors.array(),
      message: "Validate Errors",
    });
  } else {
    try {
      const dbConnect = dbo.getDb();
      const { status } = req.body;
      const _id = req.params.machineId;

      dbConnect
        .collection("machines")
        .updateOne(
          { _id: ObjectId(_id) },
          { $set: { status: status || false } },
          (error, result) => {
            if (error) {
              return res.json({
                success: false,
                errors: error,
                message: "Update failed.",
              });
            }

            res.json({
              success: true,
              data: result,
              message: "Update successfully.",
            });
          }
        );
    } catch (error) {
      res.json({
        success: false,
        errors: error,
        message: "Error happened.",
      });
    }
  }
};

exports.getAll = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: errors.array(),
      message: "Validate Errors",
    });
  } else {
    try {
      const dbConnect = dbo.getDb();

      dbConnect
        .collection("machines")
        .find({})
        .limit(50)
        .toArray(function (err, result) {
          if (err) {
            res.status(400).send("Error fetching listings!");
          } else {
            res.json({
              success: true,
              data: result,
              message: "Get list machine success",
            });
          }
        });
    } catch (error) {
      res.json({
        success: false,
        errors: error,
        message: "Error happened.",
      });
    }
  }
};
