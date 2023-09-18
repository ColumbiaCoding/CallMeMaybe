const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;

var apiKey = '45828062';
var sessionId = '1_MX40NTgyODA2Mn5-MTY5NDQ0OTUyMTI0OH5sUkxxeldHTW9Qa3NwL3Zkb3orV0drSUx-UH5-';
var token = 'T1==cGFydG5lcl9pZD00NTgyODA2MiZzaWc9ZjJkNTQ3N2Q1NjJmNTkzMzliODg5NDYzY2Y1NDY2MGQ2MTljNDc2ZTpzZXNzaW9uX2lkPTFfTVg0ME5UZ3lPREEyTW41LU1UWTVORFEwT1RVeU1USTBPSDVzVWt4eGVsZEhUVzlRYTNOd0wzWmtiM29yVjBkclNVeC1VSDUtJmNyZWF0ZV90aW1lPTE2OTQ0NDk2NzUmbm9uY2U9MC45Mjg4NzQ1Nzc1MDA5MDQ2JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE2OTQ1MzYwNzU=';