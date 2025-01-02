const jsonServer = require('json-server');
const express = require('express');
const path = require('path');
const app = express();
const router = jsonServer.router('./database/db.json');

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'build')));

// Use JSON Server routes under /api
app.use('/api', router);

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});