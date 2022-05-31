const express = require("express");
const router = express.Router();

//router
const brandRouter = require("./brand");
const glassRouter = require("./glass");
const machineRouter = require("./machine");
const strapRouter = require("./strap");
const productRouter = require("./product");
const accountRouter = require("./account");

router.use("/api/brands", brandRouter);
router.use("/api/glasses", glassRouter);
router.use("/api/machines", machineRouter);
router.use("/api/straps", strapRouter);
router.use("/api/products", productRouter);
router.use("/api/accounts", accountRouter);

module.exports = router;
