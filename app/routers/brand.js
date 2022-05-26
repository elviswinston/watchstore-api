const express = require("express");
const router = express.Router();

const brandController = require("../controllers/brand");

router.get("/", brandController.getAll);
router.post("/", brandController.create);
router.put("/:branchId", brandController.update);
router.put("/updateStatus/:branchId", brandController.updateStatus);

module.exports = router;
