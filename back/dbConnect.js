const mysql = require('mysql');
const dotenv = require("dotenv").config();

// Connexion à la base de données
exports.connection = mysql.createPool({
    host     : 'localhost',
    user     : `${process.env.DB_USER}`,
    password : `${process.env.DB_PASSWORD}`,
    database : 'Groupomania',
    timezone : 'local',
    charset : 'utf8mb4'
  });
