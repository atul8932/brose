// routes/Auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Account = require("../models/Account");
const sequelize = require("sequelize");
const router = express.Router();

// Signup Route
router.post(
  "/signup",
  [
    check("email", "Please provide a valid email").isEmail(),
    check("phone", "Please provide a valid phone number").isNumeric(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, phone, password } = req.body;

    try {
      const existingUser = await Account.findOne({
        where: {
          [sequelize.Op.or]: [{ email }, { phone }],
        },
      });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists." });
      }

      // Create new user without password hashing
      const user = await Account.create({
        email,
        phone,
        password, // Store the password as plain text
      });

      res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Server error." });
    }
  }
);

// Login Route
router.post(
  "/login",
  [
    check("identifier", "Please provide an email or phone number")
      .not()
      .isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { identifier, password } = req.body;

    try {
      // Find user by email or phone
      const user = await Account.findOne({
        where: {
          [sequelize.Op.or]: [{ email: identifier }, { phone: identifier }],
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Compare passwords directly without encryption
      if (password !== user.password) {
        return res.status(401).json({ message: "Invalid password." });
      }

      // Create token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token, message: "Logged in successfully!" });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error." });
    }
  }
);

module.exports = router;
