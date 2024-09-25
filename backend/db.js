// db.js
require("dotenv").config(); // Load environment variables from .env file

const { Sequelize } = require("sequelize");

// Create a new Sequelize instance with the database configuration
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Database host
    dialect: process.env.DB_DIALECT, // Database dialect (mysql)
    port: process.env.DB_PORT, // Database port (default: 3306)
    logging: false, // Disable logging or set to true for debugging
  }
);

module.exports = sequelize;
