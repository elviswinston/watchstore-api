const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart");

router.get("/:accountId", cartController.list);
router.post("/", cartController.create);
router.put("/:cartId", cartController.updateAmount);

module.exports = router;
