const express = require("express");
const app = express();

require("dotenv").config();

// Middleware
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
