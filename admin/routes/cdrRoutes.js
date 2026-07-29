const express = require("express");

const router = express.Router();

const CallRecord = require("../CallRecord");

const { protect, authorize } = require("../middleware/authMiddleware");
const buildPhoneFilter = (value) => {
    const digits = String(value ?? "").replace(/\D/g, "");

    if (!digits) {
        return null;
    }

    // Treat long inputs as full phone numbers, while allowing an optional leading 0.
    if (digits.length >= 10) {
        return { $regex: `^0?${digits}$` };
    }

    // Short inputs are treated as partial matches.
    return { $regex: digits };
};

// GET /api/cdr
const getAllCallRecords = async (req, res) => {
    try {

        // Read query parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        const caller = req.query.caller || req.query.callerNumber || req.query.caller_number;
        const receiver = req.query.receiver || req.query.receiverNumber || req.query.receiver_number;
        const city = req.query.city;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        // Build filter object
        const filter = {};

        if (caller) {
            const callerFilter = buildPhoneFilter(caller);

            if (callerFilter) {
                filter.caller_number = callerFilter;
            }
        }

        if (receiver) {
            const receiverFilter = buildPhoneFilter(receiver);

            if (receiverFilter) {
                filter.receiver_number = receiverFilter;
            }
        }

        if (city) {
            filter.city = city;
        }

        if (startDate && endDate) {
            filter.timestamp = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        // Count total matching records
        const totalRecords = await CallRecord.countDocuments(filter);

        // Fetch paginated data
        const records = await CallRecord.find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ timestamp: -1 });

        res.status(200).json({
            success: true,
            page,
            limit,
            totalRecords,
            totalPages: Math.ceil(totalRecords / limit),
            message: totalRecords === 0 ? "No matching call records found" : undefined,
            data: records
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch call records",
            error: error.message
        });

    }
};


router.get("/", protect, getAllCallRecords);

router.get(
    "/analytics",
    protect,
    authorize("Admin"),
    async (req, res) => {
    try {

        /*const totalCalls = await CallRecord.countDocuments();

        const calls = await CallRecord.find();

        const totalDuration = calls.reduce(
            (sum, call) => sum + (call.duration || 0),
            0
        );

        const averageDuration =
            totalCalls > 0 ? totalDuration / totalCalls : 0;

        res.json({
            success: true,
            totalCalls,
            totalDuration,
            averageDuration: averageDuration.toFixed(2)
        });*/

        const calls = await CallRecord.find();

const totalCalls = calls.length;

const totalDuration = calls.reduce(
    (sum, call) => sum + (call.duration || 0),
    0
);

const averageDuration =
    totalCalls > 0 ? totalDuration / totalCalls : 0;

const longestCall =
    Math.max(...calls.map(call => call.duration || 0));

const shortestCall =
    Math.min(...calls.map(call => call.duration || 0));

const totalCost =
    calls.reduce((sum, call) => sum + ((call.duration || 0) * 0.12), 0);

const successfulCalls =
    calls.filter(call => call.call_type === "outgoing").length;

const failedCalls =
    totalCalls - successfulCalls;

res.json({
    success: true,
    totalCalls,
    totalDuration,
    averageDuration: Number(averageDuration.toFixed(2)),
    longestCall,
    shortestCall,
    totalCost: Number(totalCost.toFixed(2)),
    successfulCalls,
    failedCalls,
});
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});

module.exports = router;