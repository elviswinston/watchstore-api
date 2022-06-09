const express = require("express");
const upload = require("../utils/multer");
const router = express.Router();

const productController = require("../controllers/product");

router.get("/all", productController.listAll);
router.get("/", productController.list);
router.post("/getListByBrand", productController.listByBrand);
router.post("/", upload.single("file"), productController.create);
router.put("/:productId", productController.update);
router.delete("/:productId", productController.remove);
module.exports = router;
