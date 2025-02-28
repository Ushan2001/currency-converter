const express = require("express");
const router = express.Router();
const {
  addTransferData,
  convertAmount,
  getAllTransferData,
  getTransferDataById,
  deleteTransferData,
} = require("../controllers/transferController");

router.post("/", addTransferData);
router.post("/convert", convertAmount);
router.get("/", getAllTransferData);
router.get("/:id", getTransferDataById);
router.delete("/:id", deleteTransferData);

module.exports = router;
