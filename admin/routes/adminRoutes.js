const express = require("express");

const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Registration route under admin namespace for client compatibility
router.post("/register", registerUser);

// Login route under admin namespace for client compatibility
router.post("/login", loginUser);

// Admin-only dashboard route
router.get("/dashboard", protect, authorize("Admin"), (req, res) => {
	res.status(200).json({
		success: true,
		message: "Welcome Admin!",
		user: req.user
	});
});

module.exports = router;
