const express = require("express");
const router = express.Router();

//router
const brandRouter = require("./brand");
const glassRouter = require("./glass");
const machineRouter = require("./machine");
const strapRouter = require("./strap");
const productRouter = require("./product");

router.use("/api/brands", brandRouter);
router.use("/api/glasses", glassRouter);
router.use("/api/machines", machineRouter);
router.use("/api/straps", strapRouter);
router.use("/api/products", productRouter);

module.exports = router;
