const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized. No token provided."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not found."
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};

const normalizeRole = (role) => role?.toString().trim().toLowerCase();

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Please log in."
            });
        }

        const normalizedUserRole = normalizeRole(req.user.role);
        const normalizedRoles = roles.map(normalizeRole);

        if (!normalizedRoles.includes(normalizedUserRole)) {
            return res.status(403).json({
                success: false,
                message: "Access denied. You do not have permission to access this resource."
            });
        }

        next();
    };
};

module.exports = {
    protect,
    authorize
};

