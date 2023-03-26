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

//shoutcast proxy

const { createProxyMiddleware } = require("http-proxy-middleware");

app.use(
  "/zion",
  createProxyMiddleware({
    target: "https://web.zionsound.fr:8002",
    changeOrigin: true,
    pathRewrite: { "^/zion": "/stats" },
  })
);

app.use(
  "/dubatek",
  createProxyMiddleware({
    target: "https://web.zionsound.fr:8012",
    changeOrigin: true,
    pathRewrite: { "^/dubatek": "/stats" },
  })
);

app.listen(8090, () => {
  console.log("Proxy server running on port 8090");
});

module.exports = app;
