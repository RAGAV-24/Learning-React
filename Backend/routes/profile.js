// routes/profile.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = 'uploads/profile';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Filter for image uploads
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// @route   GET /api/profile
// @desc    Get current user's profile
// @access  Private
router.get("/profile", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      // Return empty profile with default values if none exists
      return res.json({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        bio: "",
        profilePicture: null,
        skills: [],
      });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/profile
// @desc    Create or update user profile
// @access  Private
router.post("/profile", auth, async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    zipCode,
    bio,
    skills
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (firstName) profileFields.firstName = firstName;
  if (lastName) profileFields.lastName = lastName;
  if (email) profileFields.email = email;
  if (phone) profileFields.phone = phone;
  if (address) profileFields.address = address;
  if (city) profileFields.city = city;
  if (state) profileFields.state = state;
  if (zipCode) profileFields.zipCode = zipCode;
  if (bio) profileFields.bio = bio;
  if (skills) {
    profileFields.skills = Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim());
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/profile/upload
// @desc    Upload profile picture
// @access  Private
router.post("/upload", [auth, upload.single("profilePicture")], async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const profile = await Profile.findOne({ user: req.user.id });

    // Delete old profile picture if it exists
    if (profile && profile.profilePicture) {
      const oldImagePath = path.join(__dirname, '..', profile.profilePicture);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Update profile with new picture path
    const imagePath = `/${req.file.path.replace(/\\/g, '/')}`;

    if (profile) {
      profile.profilePicture = imagePath;
      await profile.save();
    } else {
      const newProfile = new Profile({
        user: req.user.id,
        profilePicture: imagePath
      });
      await newProfile.save();
    }

    res.json({ profilePicture: imagePath });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;