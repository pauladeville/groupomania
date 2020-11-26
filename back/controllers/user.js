const mysql = require('../dbConnect').connection; //Connexion à la bd
const dotenv = require("dotenv").config();
const bcrypt = require('bcrypt'); // Pour crypter le mot de passe
const jwt = require('jsonwebtoken'); // Génère un token sécurisé
const fs = require('fs'); // Permet de gérer les fichiers stockés
const { response } = require('express');

// Création de l'utilisateur et hashage du mot de passe
exports.signup = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    let sqlSignup = "INSERT INTO User VALUES (NULL, ?, ?, NOW())";
    let values = [firstName, lastName];
    mysql.query(sqlSignup, values, function(error, result) {
        if (error) {
            console.log(error)
        } else {
            console.log("Utilisateur créé")
        }
    });
    let sqlLogin = "SELECT * FROM User WHERE firstName = ?";
    mysql.query(sqlLogin, [firstName], function(error, result) {
        if (error) {
            return res.status(500).json(error.message)
        } else {
            return res.status(200).json({
                userProfile: {
                    userID: result[0].userID,
                    firstName: result[0].firstName,
                    lastName: result[0].lastName,
                },
                token: jwt.sign(
                    { userID: result[0].userID },
                    process.env.TOKEN,
                    { expiresIn: "24h" }
                )
            })
        }
    })
};

// Login de l'utilisateur
exports.login = (req, res, next) => {
    //récupérer les identifiants transmis par le front
    const firstNameLogin = req.body.firstName;
    const lastNameLogin = req.body.lastName;
    //recherche mySQL
    let sqlLogin = "SELECT * FROM User WHERE firstName = ?";
    mysql.query(sqlLogin, [firstNameLogin], function(error, result) {
        if(error) {
            return res.status(500).json(error.message);
        }
        else if(result.length == 0) {
            return res.status(404).json({ error: "Profil introuvable"})
        }
        //si le profil correspond, renvoyer un token
        else if(lastNameLogin == result[0].lastName) {
            return res.status(200).json({
                userProfile: {
                    userID: result[0].userID,
                    firstName: result[0].firstName,
                    lastName: result[0].lastName,
                },
                token: jwt.sign(
                    { userID: result[0].userID },
                    process.env.TOKEN,
                    { expiresIn: "24h" }
                )
            })
        }
        else {
            return res.status(401).json({ error: "Le nom et le prénom ne correspondent pas."})
        }
    })
};

// Suppresion d'un utilisateur
exports.delete = (req, res, next) => {
};

// Récupérer le profil d'un utilisateur
exports.profile = (req, res, next) => {
    let userID = req.params["id"];
    let sqlGet = "SELECT * FROM User WHERE userID = ?";
    mysql.query(sqlGet, [userID], function(error, result) {
        if(error) {
            return res.status(500).json(error.message);
        }
        else {
            return res.status(200).json({ message: "voici les informations du profil "})
        }
    })
};

// Modifier un profil
exports.modify = (req, res, next) => {
};
