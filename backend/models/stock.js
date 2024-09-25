const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Make sure this path points to your Sequelize instance

const Stock = sequelize.define(
  "Stock",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    stockName: {
      type: DataTypes.STRING(255), // Match the length with your schema
      allowNull: true, // Column is nullable (YES in the schema)
    },
    priceRecommended: {
      type: DataTypes.DECIMAL(10, 2), // DECIMAL(10, 2)
      allowNull: true,
    },
    priceRecommendedDate: {
      type: DataTypes.DATEONLY, // DATE
      allowNull: true,
    },
    firstTargetPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    firstTargetPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    secondTargetPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    secondTargetPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    thirdTargetPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    thirdTargetPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    targetMeetAt: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    stockType: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    stockSector: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    volume: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    marketCap: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    peRatio: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    dividendYield: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
  },
  {
    tableName: "stocks", // Table name in your database
    timestamps: true, // If your table has `createdAt` and `updatedAt` columns, otherwise set to false
  }
);

module.exports = Stock;
