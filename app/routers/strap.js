const express = require("express");
const router = express.Router();

const strapController = require("../controllers/strap");

router.get("/", strapController.list);
router.post("/", strapController.create);
router.put("/:strapId", strapController.update);
router.delete("/:strapId", strapController.delete);

module.exports = router;
