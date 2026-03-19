const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Load student data from local JSON file using require so Vercel bundles it safely
const students = require('./students.json');

// Helper to escape regex special characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

// Search endpoint
app.get('/api/students/search', (req, res) => {
  const query = req.query.q || '';
  
  // Lazy loading: only trigger after 3 letters
  if (query.trim().length < 3) {
    return res.json([]);
  }

  // Case-insensitive search, handle special chars
  const safeQuery = escapeRegExp(query.trim());
  const regex = new RegExp(safeQuery, 'i');

  const matchingStudents = [];
  
  for (let student of students) {
    if (regex.test(student.Name)) {
      matchingStudents.push(student);
      // Stop once we have 5 matches
      if (matchingStudents.length === 5) {
        break;
      }
    }
  }

  // Optional: Add artificial delay to simulate realistic network latency and test debounce
  setTimeout(() => {
    res.json(matchingStudents);
  }, 200); 
});

// Export the Express app for Vercel Serverless Functions
module.exports = app;

// Only listen on a port if not running in a Vercel Serverless environment
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
