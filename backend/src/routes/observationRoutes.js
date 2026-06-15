const express = require("express");
const router = express.Router();

const { createObservation } = require("../controllers/observationController");
const upload = require("../middleware/uploadMiddleware");

router.post(
    "/create",
    upload.single("document"),
    createObservation
);

module.exports = router;