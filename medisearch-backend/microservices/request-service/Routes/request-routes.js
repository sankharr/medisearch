const express = require("express");
const router = express.Router();
const requestController = require("../Controller/request-controller");

router.get("/", requestController.getAllRequests);
router.get("/:id", requestController.getRequest);
router.post("/", requestController.createRequest);

module.exports = router;