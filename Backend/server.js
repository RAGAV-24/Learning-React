const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173","https://localhost:5173"],  // Change to your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],  // Removed "Authorization"
  credentials: true
}));

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded files statically
app.use("/uploads", express.static(uploadDir));

// Routes (Ensure no authentication middleware is applied here)
app.use("/api/auth", require("./routes/auth"));
app.use("/api", require("./routes/profile"));
app.use("/api/upload", require("./routes/upload")); // No auth middleware applied

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
