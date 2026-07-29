/*const mongoose = require('mongoose');

const callRecordSchema = new mongoose.Schema({
  caller_number: String,
  receiver_number: String,
  duration: Number,
  call_type: String,
  city: String,
  timestamp: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('CallRecord', callRecordSchema);*/

const mongoose = require("mongoose");

const callRecordSchema = new mongoose.Schema(
  {
    callerNumber: {
      type: String,
      required: true,
      trim: true,
    },

    receiverNumber: {
      type: String,
      required: true,
      trim: true,
    },

    callType: {
      type: String,
      required: true,
      enum: ["Incoming", "Outgoing"],
    },

    duration: {
      type: Number,
      required: true,
      min: 0,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    timestamp: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CallRecord", callRecordSchema);