const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const cdrRoutes = require("./routes/cdrRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { registerUser, loginUser } = require("./controllers/authController");

// Create the Express application
const app = express();

const isProduction = process.env.NODE_ENV === "production";
const jwtSecret = process.env.JWT_SECRET;

if (isProduction && !jwtSecret) {
    throw new Error("JWT_SECRET is required in production.");
}

const parseOrigins = () => {
    const singleOrigin = process.env.CORS_ORIGIN || "";
    const originList = process.env.CORS_ORIGINS || "";

    return [singleOrigin, ...originList.split(",")]
        .map((origin) => origin.trim())
        .filter(Boolean);
};

const allowedOrigins = parseOrigins();

const corsOptions = {
    origin(origin, callback) {
        // Allow server-to-server requests and same-origin requests without Origin header.
        if (!origin) {
            return callback(null, true);
        }

        if (!allowedOrigins.length || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("CORS policy blocked this origin."));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"]
};

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many authentication requests. Please try again later."
    }
});

// Attempt database connection without blocking startup
connectDB().catch(() => {
    // Intentionally ignored so the server can continue running locally.
});

// Middleware
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/cdr", cdrRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/admin", adminRoutes);

// Backward-compatible alias for clients calling admin namespace registration
app.post("/api/admin/register", authLimiter, registerUser);

// Backward-compatible alias for clients calling admin namespace login
app.post("/api/admin/login", authLimiter, loginUser);
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