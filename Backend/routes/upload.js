const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /pdf|doc|docx|txt/;
  const extName = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedFileTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, DOCX, and TXT files are allowed"));
  }
};

// Multer middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

// Upload route
router.post("/", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { companyName, year, experience } = req.body;

    if (!companyName || !year || !experience) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    res.status(200).json({
      message: "File uploaded successfully",
      filePath: `/uploads/${req.file.filename}`,
      companyName,
      year,
      experience
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Server error during upload" });
  }
});

module.exports = router;
