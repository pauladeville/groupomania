const mysql = require('mysql');
const dotenv = require("dotenv").config({path: ".env"});

// Connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: 'Groupomania',
  timezone: 'local',
  charset: 'utf8mb4'
});

db.connect((error) => {
  if(error) {
    throw error;
  } else {
    console.log("Connecté à MySQL avec l\'ID " + db.threadId);
  }
});

module.exports = db;