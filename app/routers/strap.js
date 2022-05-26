const express = require("express");
const router = express.Router();

const strapController = require("../controllers/strap");

router.get("/", strapController.getAll);
router.post("/", strapController.create);
router.put("/:strapId", strapController.update);
router.put("/updateStatus/:strapId", strapController.updateStatus);

module.exports = router;
