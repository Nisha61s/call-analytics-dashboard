const express = require("express");

const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

// Admin only route
router.get("/dashboard", protect, authorize("Admin"), (req, res) => {

    res.status(200).json({
        success: true,
        message: "Welcome Admin!",
        user: req.user
    });

});
module.exports = router;