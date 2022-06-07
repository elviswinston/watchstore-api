const express = require("express");
const router = express.Router();

const glassController = require("../controllers/glass");

router.get("/", glassController.list);
router.post("/", glassController.create);
router.put("/:glassId", glassController.update);
router.delete("/:glassId", glassController.delete);

module.exports = router;
