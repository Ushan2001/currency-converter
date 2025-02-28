const Transfer = require("../models/Transfer");
const moment = require("moment-timezone");
const allowedCountries = ["LKR", "USD", "AUD", "INR"];
require("dotenv").config();
const ExchangeAPI = process.env.ExchangeAPI || "4beb1eb1343647c27388e5d9";
const axios = require("axios");

const addTransferData = async (req, res) => {
  const { fromCountry, toCountry, amount, convertedAmount, status } = req.body;

  if (!allowedCountries.includes(fromCountry)) {
    return res.status(400).json({
      message: "Invalid fromCountry. Allowed values: LKR, USD, AUD, INR",
    });
  }

  if (!allowedCountries.includes(toCountry)) {
    return res.status(400).json({
      message: "Invalid toCountry. Allowed values: LKR, USD, AUD, INR",
    });
  }

  if (!status || !["active", "inactive"].includes(status)) {
    return res.status(400).json({
      message: "Invalid status. Allowed values: active, inactive",
    });
  }

  const now = moment().tz("Asia/Colombo");
  const createDate = now.format("YYYY-MM-DD");
  const createTime = now.format("HH:mm:ss");

  try {
    const missingFields = [];
    if (!fromCountry) missingFields.push("From Country");
    if (!toCountry) missingFields.push("To Country");
    if (!amount) missingFields.push("Amount");
    if (!convertedAmount) missingFields.push("Converted Amount");

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields}`,
      });
    }

    const newTransferData = new Transfer({
      fromCountry,
      toCountry,
      amount,
      convertedAmount,
      createDate,
      createTime,
      status,
    });

    await newTransferData.save();
    res.status(201).json({
      message: "Transfer added successfully!",
      newTransferData,
    });
  } catch (error) {
    res.status(400).json({
      message: "Adding transfer failed",
      error: error.message,
    });
  }
};

const convertAmount = async (req, res) => {
  const { fromCountry, toCountry } = req.body;

  try {
    const { data } = await axios.get(
      `https://v6.exchangerate-api.com/v6/${ExchangeAPI}/latest/${fromCountry}`
    );

    if (!data.conversion_rates[toCountry]) {
      return res.status(400).json({
        message: "Invalid conversion currency pair.",
      });
    }

    res.status(200).json({
      exchangeRate: data.conversion_rates[toCountry],
    });
  } catch (error) {
    res.status(400).json({
      message: "Conversion failed",
      error: error.message,
    });
  }
};

const getAllTransferData = async (req, res) => {
  try {
    const transfers = await Transfer.find().select(
      "-createdAt -updatedAt -__v"
    );

    res.status(200).json(transfers.map((transfer) => transfer.toObject()));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching transfer", error: error.message });
  }
};

const getTransferDataById = async (req, res) => {
  try {
    const transfer = await Transfer.findById(req.params.id).select(
      "-createDate -createTime -createdAt -updatedAt -__v"
    );

    if (!transfer) {
      return res.status(404).json({
        message: "Transfer not found!",
      });
    }

    return res.status(200).json(transfer);
  } catch (error) {
    return res.status(500).json({
      message: "Fetching transfer failed!",
      error: error.message,
    });
  }
};

const deleteTransferData = async (req, res) => {
  try {
    const transfer = await Transfer.findById(req.params.id);
    if (!transfer) {
      return res.status(404).json({ message: "Transfer data not found" });
    }

    await Transfer.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Transfer deleted successfully",
      transfer,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error deleting transfer data",
      error: error.message,
    });
  }
};

module.exports = {
  addTransferData,
  convertAmount,
  getAllTransferData,
  getTransferDataById,
  deleteTransferData,
};
