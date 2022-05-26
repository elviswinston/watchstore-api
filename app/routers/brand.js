const express = require("express");
const router = express.Router();

const brandController = require("../controllers/brand");

router.get("/", brandController.getAll);

module.exports = router;
