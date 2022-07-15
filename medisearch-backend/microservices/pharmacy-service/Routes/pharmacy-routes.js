const express = require("express");
const router = express.Router();
const pharmacyController = require("../Controller/pharmacy-controller");

router.get("/", pharmacyController.getAllPharmacies);

module.exports = router;