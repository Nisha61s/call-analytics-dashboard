const CallRecord = require("../models/CallRecord");
const { protect } = require("../middleware/authMiddleware");
// Total Calls
const getTotalCalls = async (req, res) => {
    try {
        const totalCalls = await CallRecord.countDocuments();

        res.status(200).json({
            success: true,
            totalCalls
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Total Duration
const getTotalDuration = async (req, res) => {
    try {

        const result = await CallRecord.aggregate([
            {
                $group: {
                    _id: null,
                    totalDuration: {
                        $sum: "$duration"
                    }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            totalDuration: result[0]?.totalDuration || 0
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Call Type Distribution
const getCallTypeDistribution = async (req, res) => {
    try {

        const distribution = await CallRecord.aggregate([
            {
                $group: {
                    _id: "$callType",
                    count: {
                        $sum: 1
                    }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            distribution
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Top Callers
const getTopCallers = async (req, res) => {
    try {

        const callers = await CallRecord.aggregate([
            {
                $group: {
                    _id: "$callerNumber",
                    totalCalls: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    totalCalls: -1
                }
            },
            {
                $limit: 10
            }
        ]);

        res.status(200).json({
            success: true,
            callers
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getTotalCalls,
    getTotalDuration,
    getCallTypeDistribution,
    getTopCallers
};