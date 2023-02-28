const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'applications_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Database connected');
});

module.exports = connection;
