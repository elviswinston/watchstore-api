const express = require("express");
const router = express.Router();

const brandController = require("../controllers/brand");

router.get("/", brandController.list);
router.post("/", brandController.create);
router.put("/:brandId", brandController.update);
// router.put("/updateStatus/:branchId", brandController.updateStatus);

module.exports = router;
