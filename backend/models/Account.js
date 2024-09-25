// models/Account.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Account = sequelize.define(
  "Account",
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "login_details",
  }
);

// Remove the beforeCreate hook for password encryption
// You don't need to modify the password here

module.exports = Account;
