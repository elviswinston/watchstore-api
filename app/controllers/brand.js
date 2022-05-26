const { validationResult } = require("express-validator");

const dbo = require("../db/conn");

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
        .collection("listingsAndReviews")
        .find({})
        .limit(50)
        .toArray(function (err, result) {
          if (err) {
            res.status(400).send("Error fetching listings!");
          } else {
            res.json({
              success: true,
              data: result,
              message: "Get list brand success",
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
