const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Route to get all applications from the database
app.get('/applications', (req, res) => {
  db.query('SELECT * FROM applications', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Route to add a new application to the database
app.post('/applications', (req, res) => {
  const { companyName, link, jobTitle, applicationDeadline } = req.body;
  db.query(
    'INSERT INTO applications (companyName, link, jobTitle, applicationDeadline) VALUES (?, ?, ?, ?)',
    [companyName, link, jobTitle, applicationDeadline],
    (err, result) => {
      if (err) throw err;
      res.sendStatus(201);
    }
  );
});

// Route to delete an application from the database
app.delete('/applications/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM applications WHERE id = ?', id, (err, result) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
