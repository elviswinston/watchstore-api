const express = require("express");
const router = express.Router();

//router
const brandRouter = require("./brand");

router.use("/api/brands", brandRouter);

module.exports = router;
