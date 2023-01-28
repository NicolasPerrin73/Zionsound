// Module
const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();

// Routes file

// Express
const app = express();

//Express Json
app.use(express.json());

// Cors header
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

//Endpoint

module.exports = app;
