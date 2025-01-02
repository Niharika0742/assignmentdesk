// Import required packages
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const path = require('path');
const jsonServer = require('json-server');

const app = express();
const PORT = process.env.PORT || 3333; // Use PORT from .env or default to 3333

// Serve React app (after building the React app)
app.use(express.static(path.join(__dirname, 'build')));

// API routes for JSON server
app.use('/api', jsonServer.router('database/db.json'));

// Handle React routing, return index.html for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
