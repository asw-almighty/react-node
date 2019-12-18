"use strict";

const path = require("path");
const express = require("express");
const app = express();

const staticPath = path.join(__dirname, "/");
const PORT = 3000;

app.use(express.static(staticPath));

const server = app.listen(PORT, function() {
  console.log(`✅ listening: http://localhost:${PORT}`);
});
