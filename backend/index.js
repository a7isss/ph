// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000; // Use dynamic port for Vercel

app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the Express API
module.exports = app;