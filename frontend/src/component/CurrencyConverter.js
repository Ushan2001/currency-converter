import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import config from "../config";

function CurrencyConverter() {
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [amount, setAmount] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [transferData, setTransferData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransferId, setSelectedTransferId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchTransferData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.apiUrl}/transfer/`);
      setTransferData(response.data);
    } catch (error) {
      console.error("Error fetching transfer data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransferData();
  }, []);

  const handleConvert = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await axios.post(`${config.apiUrl}/transfer/convert`, {
        fromCountry,
        toCountry,
      });
      setExchangeRate(response.data.exchangeRate);
      setConvertedAmount((amount * response.data.exchangeRate).toFixed(3));
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      toast.error("Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async () => {
    if (
      !amount ||
      !convertedAmount ||
      isNaN(amount) ||
      isNaN(convertedAmount)
    ) {
      toast.error("Please complete all fields correctly before transferring.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${config.apiUrl}/transfer/`, {
        fromCountry,
        toCountry,
        amount,
        convertedAmount,
        status: "active",
      });

      fetchTransferData();
      toast.success("Transfer successful!");
      setFromCountry("");
      setToCountry("");
      setAmount(0);
      setConvertedAmount(null);
      setExchangeRate(null);
      console.log(response);
    } catch (error) {
      console.error("Error transferring:", error);
      toast.error("Transfer failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${config.apiUrl}/transfer/${id}`);
      setTransferData(transferData.filter((item) => item._id !== id));
      toast.success("Transfer revoked successfully!");
    } catch (error) {
      console.error("Error revoking transfer:", error);
      toast.error("Error revoking transfer!");
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  const handleOpenDialog = (id) => {
    setSelectedTransferId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTransferId(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getCurrencySymbol = (code) => {
    const symbols = {
      USD: "$",
      AUD: "A$",
      INR: "₹",
      LKR: "Rs",
    };
    return symbols[code] || code;
  };

  const countries = [
    { name: "Sri Lanka", code: "LKR" },
    { name: "USA", code: "USD" },
    { name: "Australia", code: "AUD" },
    { name: "India", code: "INR" },
  ];

  return (
    <>
      {loading && (
        <div className="loading-container">
          <div className="loader">
            <div className="loader-inner"></div>
            <div className="loader-inner"></div>
            <div className="loader-inner"></div>
            <div className="loader-inner"></div>
            <div className="loader-icon"></div>
            <div className="loading-text">
              {fromCountry && toCountry
                ? `Converting ${fromCountry} to ${toCountry}...`
                : "Processing..."}
            </div>
          </div>
          <div className="currency-symbol">
            {getCurrencySymbol(fromCountry)}
          </div>
          <div className="currency-symbol">{getCurrencySymbol(toCountry)}</div>
          <div className="currency-symbol">$</div>
          <div className="currency-symbol">€</div>
        </div>
      )}

      <Box
        className="currency-converter-container"
        sx={{
          maxWidth: 600,
          margin: "auto",
          padding: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" className="app-title" gutterBottom>
          Currency Transfer
        </Typography>

        <FormControl
          fullWidth
          sx={{ marginBottom: 2 }}
          className="form-control"
        >
          <InputLabel>From Country</InputLabel>
          <Select
            value={fromCountry}
            onChange={(e) => setFromCountry(e.target.value)}
            label="From Country"
          >
            {countries.map((country) => (
              <MenuItem key={country.code} value={country.code}>
                {country.name} ({country.code})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          fullWidth
          sx={{ marginBottom: 2 }}
          className="form-control"
        >
          <InputLabel>To Country</InputLabel>
          <Select
            value={toCountry}
            onChange={(e) => setToCountry(e.target.value)}
            label="To Country"
          >
            {countries.map((country) => (
              <MenuItem key={country.code} value={country.code}>
                {country.name} ({country.code})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Amount"
          variant="outlined"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="amount-field"
          sx={{ marginBottom: 2 }}
        />

        <Box
          className="button-container"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
            gap: 2,
          }}
        >
          <Button
            className="action-button convert-button"
            variant="contained"
            onClick={handleConvert}
            disabled={loading}
            sx={{ flex: 1 }}
          >
            Convert
          </Button>
          <Button
            className="action-button transfer-button"
            variant="contained"
            onClick={handleTransfer}
            disabled={loading || !convertedAmount}
            sx={{ flex: 1 }}
          >
            Transfer
          </Button>
        </Box>

        {convertedAmount !== null && !loading && (
          <Box className="result-box">
            <Typography variant="h6" className="result-value">
              Exchange Rate: {exchangeRate}
            </Typography>
            <Typography variant="h6" className="result-value">
              Converted Amount: {convertedAmount} {toCountry}
            </Typography>
          </Box>
        )}

        <TableContainer className="transfers-table-container">
          <Table className="transfers-table">
            <TableHead>
              <TableRow className="table-header">
                <TableCell className="table-header-cell">
                  From Country
                </TableCell>
                <TableCell className="table-header-cell">To Country</TableCell>
                <TableCell className="table-header-cell">Amount</TableCell>
                <TableCell className="table-header-cell">
                  Converted Amount
                </TableCell>
                <TableCell className="table-header-cell">Status</TableCell>
                <TableCell className="table-header-cell">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transferData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={row._id}
                    className="table-row"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <TableCell>{row.fromCountry}</TableCell>
                    <TableCell>{row.toCountry}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.convertedAmount}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      <Button
                        className="revoke-button"
                        variant="outlined"
                        color="error"
                        onClick={() => handleOpenDialog(row._id)}
                      >
                        Revoke
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={transferData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableContainer>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          className="dialog-container"
        >
          <DialogTitle className="dialog-title">Confirm Revoke</DialogTitle>
          <DialogContent>
            Are you sure you want to revoke this transfer?
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              color="primary"
              className="dialog-button"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleRevoke(selectedTransferId)}
              color="secondary"
              className="dialog-button"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="toast-notification"
        />
      </Box>
    </>
  );
}

export default CurrencyConverter;
