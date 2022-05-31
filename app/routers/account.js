const express = require("express");
const router = express.Router();

const accountController = require("../controllers/account");

router.post("/login", accountController.login);
router.post("/register", accountController.register);

module.exports = router;
