# Currency Converter with Transfer History

## Overview
This project is a **Currency Converter** that allows users to convert money between **Sri Lanka (LKR), USA (USD), Australia (AUD), and India (INR)**. It also tracks transfer history, allowing users to **revoke (delete) past transfers**.

## Features
- Convert currency using **ExchangeRate-API**.
- Store transfer history in **MongoDB Atlas**.
- User-friendly **React.js** UI with **Material UI**.
- RESTful API using **Node.js, Express.js, and MongoDB**.
- Delete previous transfers with a **Revoke button**.

## Technologies Used
- **Frontend:** React.js, Material UI
- **Backend:** Node.js, Express.js, MongoDB Atlas
- **API:** ExchangeRate-API

---
## Installation & Setup

### **1. Clone the repository**
```sh
 git clone https://github.com/Ushan2001/currency-converter.git
```

### **2. Setup Backend**
```sh
 cd backend
 npm install
```

#### **2.1 Create `.env` file in `backend/`**
```sh
MONGO_URI = mongodb+srv://ushan:ushan2025@currencyconveter.on7qr.mongodb.net/?retryWrites=true&w=majority&appName=currencyConveter
PORT = 5000
EXCHANGE_API_KEY = 4beb1eb1343647c27388e5d9
```

#### **2.2 Start the backend server**
```sh
 npm start
```

### **3. Setup Frontend**
```sh
 cd frontend
 npm install
```

#### **3.1 Start the frontend server**
```sh
 npm start
```

Frontend will be available at `http://localhost:3000`.
Backend will be running on `http://localhost:5000`.

---
## Project Structure
```
currency-converter/
│── backend/             # Node.js + Express.js Backend
│   ├── controllers/     # API Controllers
│   ├── models/         # MongoDB Models
│   ├── routes/         # Express Routes
│   ├── server.js       # Main server file
│── frontend/            # React.js Frontend
│   ├── src/
│   ├── App.js
│   ├── index.js
│── .env                 # Environment variables
│── package.json         # Dependencies
│── README.md            # Documentation
```

---
## API Endpoints
### **1. Convert & Save Transfer**
**POST** `/`
```json
{
    "fromCountry" : "LKR",
    "toCountry" : "USD",
    "amount" : 100,
    "convertedAmount" : 200,
    "status": "active"
}
```
Response:
```json
{"message":"Transfer added successfully!","newTransferData":{"fromCountry":"LKR","toCountry":"USD","amount":100,"convertedAmount":200,"createDate":"2025-02-28","createTime":"08:25:21","status":"active","_id":"67c125992e714f10b066e7a4","createdAt":"2025-02-28T02:55:21.892Z","updatedAt":"2025-02-28T02:55:21.892Z","__v":0}}
```

### **2. Get Transfer History**
**GET** `/`
```json
[
  {
        "_id": "67c12547cda9d311016c4018",
        "fromCountry": "LKR",
        "toCountry": "USD",
        "amount": 100,
        "convertedAmount": 200,
        "createDate": "2025-02-28",
        "createTime": "08:23:59",
        "status": "active"
    },
]
```

### **3. Delete Transfer Record**
**DELETE** `/transfer/:id`
---

---
## Notes
- **Security:** Ensure your `.env` file is not committed to GitHub.
- **Further Improvements:** Add authentication and more currencies.

---
## Author
Developed by **Ushan Mihiranga** 🚀

