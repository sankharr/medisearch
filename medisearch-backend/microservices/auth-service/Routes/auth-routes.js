const express = require("express");
const router = express.Router();
const authController = require("../Controller/auth-controller");

router.post("/register", authController.userRegister);
router.post("/login", authController.userLogin);

module.exports = router;
