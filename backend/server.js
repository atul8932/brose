// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./db"); // Sequelize instance

dotenv.config(); // Load environment variables

// Check if all necessary environment variables are loaded
if (
  !process.env.DB_HOST ||
  !process.env.DB_USER ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_NAME ||
  !process.env.JWT_SECRET
) {
  console.error(
    "Missing essential environment variables. Please check your .env file."
  );
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Import and use routes
const stockRoutes = require("./routes/stocks"); // Stock-related routes
const authRoutes = require("./routes/Auth"); // Authentication routes (ensure the path is lowercase)
app.use("/api/stocks", stockRoutes);
app.use("/api/auth", authRoutes); // Use authentication routes

// Default route
app.get("/", (req, res) => {
  res.send("API is working!");
});

// Catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(404).send("API route not found");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong. Please try again later.",
    error: err.message,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Sync all defined models to the DB
sequelize
  .authenticate() // Check database connection
  .then(() => {
    console.log("Database connected successfully.");
    return sequelize.sync({ alter: true }); // Use `alter: true` with caution in production
  })
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((err) => {
    console.error(
      "Failed to synchronize models or connect to the database:",
      err
    );
  });
