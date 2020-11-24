const mysql = require('../dbConnect').connection; //Connexion à la bd
const dotenv = require("dotenv").config();
const bcrypt = require('bcrypt'); // Pour crypter le mot de passe
const jwt = require('jsonwebtoken'); // Génère un token sécurisé
const fs = require('fs'); // Permet de gérer les fichiers stockés

// Création de l'utilisateur et hashage du mot de passe
exports.signup = (req, res, next) => {
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
