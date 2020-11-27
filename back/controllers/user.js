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
                userID: result[0].userID,
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
                userID: result[0].userID,
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
    let userID = req.params["id"];
    let sqlDelete = "DELETE FROM User WHERE userID=?";
    mysql.query(sqlDelete, [userID], function(error, result) {
        if(error) {
            return res.status(500).json(error.message);
        } else {
            return res.status(200).json();
        }
    })
}

// Récupérer le profil d'un utilisateur
exports.profile = (req, res, next) => {
    let userID = req.params["id"];
    let sqlGet = "SELECT firstName, lastName FROM User WHERE userID=?";
    mysql.query(sqlGet, [userID], function(error, result) {
        if(error) {
            return res.status(500).json(error.message);
        }
        else {
            return res.status(200).json(result);
        }
    })
};

// Modifier un profil
exports.modify = (req, res, next) => {
    let updatedProfile = {
        userID: req.params["id"],
        firstName: req.body.newFirstName,
        lastName: req.body.newLastName,
    };
    // console.log(updatedProfile);
    let sqlModify = "UPDATE User SET firstName=?, lastName=? WHERE userID=?";
    let values = [updatedProfile.firstName, updatedProfile.lastName, updatedProfile.userID];
    mysql.query(sqlModify, values, function(error, result) {
        if (error) {
            res.status(500).json(error.message);
        }
        if (result.affectedRows == 0) {
            res.status(400).json({ message: "La modification n'a pas pu aboutir" });
        }
        else {
            res.status(200).json({ message: "Modification effectuée" });
        }
})
    
};
