const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");

router.get("/", productController.getAll);
router.post("/", productController.create);
router.put("/:productId", productController.update);
router.put("/updateStatus/:productId", productController.updateStatus);

module.exports = router;
