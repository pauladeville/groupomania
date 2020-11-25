const mysql = require('../dbConnect').connection; //Connexion à la bd
const dotenv = require("dotenv").config();
const bcrypt = require('bcrypt'); // Pour crypter le mot de passe
const jwt = require('jsonwebtoken'); // Génère un token sécurisé
const fs = require('fs'); // Permet de gérer les fichiers stockés

// Création de l'utilisateur et hashage du mot de passe
exports.signup = (req, res, next) => {
    // const profileReceived = JSON.parse(req.body.userProfile);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    let sqlSignup = "INSERT INTO User VALUES (NULL, ?, ?, NOW())";
    let values = [firstName, lastName];
    mysql.query(sqlSignup, values, function(error, result) {
        if (error) {
            return res.status(500).json(error.message)
        }
        res.status(201).json({ message: "Meilleure meuf" });
    })
};

// Login de l'utilisateur
exports.login = (req, res, next) => {
};

// Suppresion d'un utilisateur
exports.delete = (req, res, next) => {
};

// Récupérer le profil d'un utilisateur
exports.profile = (req, res, next) => {
};

// Modifier un profil
exports.modify = (req, res, next) => {
};
