const CallRecord = require("../CallRecord");

// GET /api/cdr
const getAllCallRecords = async (req, res) => {
    try {

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        // Count total records
        const totalRecords = await CallRecord.countDocuments();

        // Fetch only the requested page
        const records = await CallRecord.find()
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            page,
            limit,
            totalRecords,
            totalPages: Math.ceil(totalRecords / limit),
            data: records,
        });
    }catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch call records",
            error: error.message
        });

    }
};

module.exports = {
    getAllCallRecords
};