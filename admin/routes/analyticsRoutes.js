const express = require("express");

const router = express.Router();

const {
    getTotalCalls,
    getTotalDuration,
    getCallTypeDistribution,
    getTopCallers
} = require("../controllers/analyticsController");
const { protect } = require("../middleware/authMiddleware");

router.get("/total-calls", protect, getTotalCalls);

router.get("/total-duration", protect, getTotalDuration);

router.get("/call-type-distribution", protect, getCallTypeDistribution);

router.get("/top-callers", protect, getTopCallers);

module.exports = router;