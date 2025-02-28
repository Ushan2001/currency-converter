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
 git clone https://github.com/yourusername/currency-converter.git
 cd currency-converter
```

### **2. Setup Backend**
```sh
 cd backend
 npm install
```

#### **2.1 Create `.env` file in `backend/`**
```sh
MONGO_URI=your_mongodb_atlas_connection_string
EXCHANGE_API_KEY=your_exchangerate_api_key
```

#### **2.2 Start the backend server**
```sh
 node server.js
```

### **3. Setup Frontend**
```sh
 cd ../frontend
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
**POST** `/transfer`
```json
{
  "fromCountry": "USD",
  "toCountry": "LKR",
  "amount": 10
}
```
Response:
```json
{
  "fromCountry": "USD",
  "toCountry": "LKR",
  "amount": 10,
  "convertedAmount": 3000,
  "_id": "65f6e1a9c7e26f"
}
```

### **2. Get Transfer History**
**GET** `/history`
```json
[
  {
    "fromCountry": "USD",
    "toCountry": "LKR",
    "amount": 10,
    "convertedAmount": 3000,
    "_id": "65f6e1a9c7e26f"
  }
]
```

### **3. Delete Transfer Record**
**DELETE** `/transfer/:id`

---
## Deployment
### **Frontend:** Deploy to **Vercel**
```sh
 cd frontend
 npm run build
 vercel deploy
```

### **Backend:** Deploy to **Render**
```sh
 cd backend
 npm install -g vercel
 vercel deploy
```

---
## Live Demo (Optional)
If you deployed the project, add your live demo link here:
- **Frontend:** [Vercel Demo](https://your-frontend.vercel.app)
- **Backend:** [Render API](https://your-backend.onrender.com)

---
## Notes
- **Security:** Ensure your `.env` file is not committed to GitHub.
- **Further Improvements:** Add authentication and more currencies.

---
## Author
Developed by **Ushan Mihiranga** 🚀

