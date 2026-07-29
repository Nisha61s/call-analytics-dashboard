const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cdrRoutes = require("./routes/cdrRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { registerUser, loginUser } = require("./controllers/authController");

// Create the Express application
const app = express();

// Attempt database connection without blocking startup
connectDB().catch(() => {
    // Intentionally ignored so the server can continue running locally.
});

// Middleware
app.use(cors());
app.use((req, res, next) => {
    const contentType = req.headers["content-type"] || "";

    if (!contentType.includes("application/json")) {
        return next();
    }

    let rawBody = "";
    req.setEncoding("utf8");

    req.on("data", (chunk) => {
        rawBody += chunk;
    });

    req.on("end", () => {
        if (!rawBody.trim()) {
            req.body = {};
            return next();
        }

        try {
            req.body = JSON.parse(rawBody);
            return next();
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid JSON payload. Please send valid JSON with double quotes around keys and string values."
            });
        }
    });

    req.on("error", () => {
        return res.status(400).json({
            success: false,
            message: "Unable to read request body."
        });
    });
});
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    if (req.method === "GET" || req.method === "HEAD") {
        return next();
    }

    if (typeof req.body === "string" && req.body.trim()) {
        try {
            req.body = JSON.parse(req.body);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid JSON payload. Please send valid JSON with double quotes around keys and string values."
            });
        }
    }

    next();
});
app.use("/api/cdr", cdrRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Backward-compatible alias for clients calling admin namespace registration
app.post("/api/admin/register", registerUser);

// Backward-compatible alias for clients calling admin namespace login
app.post("/api/admin/login", loginUser);
// Root route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend server is running!"
    });
});

// Health check route
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend server is running!"
    });
});

// Read the port from the environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});