const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transferSchema = new Schema(
  {
    fromCountry: {
      type: String,
      enum: ["LKR", "USD", "AUD", "INR"],
      required: true,
    },
    toCountry: {
      type: String,
      enum: ["LKR", "USD", "AUD", "INR"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    convertedAmount: {
      type: Number,
      required: true,
    },
    createDate: {
      type: String,
      required: true,
    },
    createTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transfer", transferSchema);
