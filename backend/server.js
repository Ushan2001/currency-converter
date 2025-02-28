const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

process.env.TZ = "Asia/Colombo";

const transferRoute = require("./routes/transfer-route");

const app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.use("/api/v1/transfer", transferRoute);

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URI;

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server Running on PORT ${PORT}`);
    });
  } catch (err) {
    console.error("Database Connection Error: ", err);
    process.exit(1);
  }
};

startServer();
