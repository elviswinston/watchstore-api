const express = require("express");
const router = express.Router();

const machineController = require("../controllers/machine");

router.get("/", machineController.list);
router.post("/", machineController.create);
router.put("/:machineId", machineController.update);
// router.put("/updateStatus/:machineId", machineController.updateStatus);

module.exports = router;
