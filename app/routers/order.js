const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order");

router.get("/:accountId", orderController.list);
router.post("/", orderController.create);
router.get("/detail/:orderId", orderController.detail);
router.put("/confirm/:orderId", orderController.confirm);
router.put("/cancel/:orderId", orderController.cancel);
router.put("/delivery/:orderId", orderController.delivery);
router.put("/success/:orderId", orderController.success);

module.exports = router;
