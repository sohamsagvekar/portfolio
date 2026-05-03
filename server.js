const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files - check for 'dist' folder first (for production)
const publicPath = fs.existsSync(path.join(__dirname, 'dist')) 
  ? path.join(__dirname, 'dist') 
  : __dirname;

app.use(express.static(publicPath));

const submissionsFile = path.join(__dirname, 'submissions.json');

// API Endpoint to collect contact info
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const submission = {
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
  };

  console.log('Received contact submission:', submission);

  let submissions = [];
  if (fs.existsSync(submissionsFile)) {
    try {
      const content = fs.readFileSync(submissionsFile, 'utf-8');
      submissions = JSON.parse(content);
    } catch (e) {
      console.error('Error parsing submissions file', e);
    }
  }
  submissions.push(submission);
  fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2));

  res.status(200).json({ message: 'Thank you for your message! Alex will get back to you soon.' });
});

// For any other route, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
