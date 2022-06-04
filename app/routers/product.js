const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");

router.get("/all", productController.listAll);
router.get("/", productController.list);
router.post("/getListByBrand", productController.listByBrand);
router.post("/", productController.create);
router.put("/:productId", productController.update);

module.exports = router;
