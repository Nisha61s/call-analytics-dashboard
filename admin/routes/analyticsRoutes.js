const express = require("express");

const router = express.Router();

const {
    getTotalCalls,
    getTotalDuration,
    getCallTypeDistribution,
    getTopCallers
} = require("../controllers/analyticsController");

router.get("/total-calls", getTotalCalls);

router.get("/total-duration", getTotalDuration);

router.get("/call-type-distribution", getCallTypeDistribution);

router.get("/top-callers", getTopCallers);

module.exports = router;