const express = require("express");
const router = express.Router();

//router
const brandRouter = require("./brand");
const glassRouter = require("./glass");
const machineRouter = require("./machine");
const strapRouter = require("./strap");
const productRouter = require("./product");
const accountRouter = require("./account");
const orderRouter = require("./order");
const cartRouter = require("./cart");

router.use("/api/brands", brandRouter);
router.use("/api/glasses", glassRouter);
router.use("/api/machines", machineRouter);
router.use("/api/straps", strapRouter);
router.use("/api/products", productRouter);
router.use("/api/orders", orderRouter);
router.use("/api/accounts", accountRouter);
router.use("/api/carts", cartRouter);

module.exports = router;
