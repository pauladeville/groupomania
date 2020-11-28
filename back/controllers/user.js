const mysql = require('../dbConnect').connection; //Connexion à la bd
const dotenv = require("dotenv").config();
const bcrypt = require('bcrypt'); // Pour crypter le mot de passe
const jwt = require('jsonwebtoken'); // Génère un token sécurisé
const fs = require('fs'); // Permet de gérer les fichiers stockés

// Création de l'utilisateur et hashage du mot de passe
exports.signup = (req, res, next) => {
    let userProfile = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    let sqlSignup = "INSERT INTO User VALUES (NULL, ?, ?, ?, ?, DEFAULT, NOW())";
    let values = [userProfile.firstName, userProfile.lastName, userProfile.email, userProfile.password];
    mysql.query(sqlSignup, values, function(error, result) {
        if (error) {
            console.log(error)
        } else {
            console.log("Utilisateur créé")
        }
    });
    let sqlToken = "SELECT * FROM User WHERE email=?";
    mysql.query(sqlToken, [userProfile.email], function(error, result) {
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
    const emailLogin = req.body.email;
    const passwordLogin = req.body.password;
    //recherche mySQL
    let sqlLogin = "SELECT * FROM User WHERE email=?";
    mysql.query(sqlLogin, [emailLogin], function(error, result) {
        if(error) {
            return res.status(500).json(error.message);
        }
        else if(result.length == 0) {
            return res.status(404).json({ error: "Profil introuvable"})
        }
        //si le profil correspond, renvoyer un token
        else if(passwordLogin == result[0].password) {
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
    let sqlGet = "SELECT * FROM User WHERE userID=?";
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

//Met à jour l'avatar depuis la page profil
exports.avatar = (req, res, next) => {
    if(req.file) {
        console.log(req.file)
        let avartarUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        let userID = req.params["id"];
        //recherche de l'avatar actuel pour pouvoir le supprimer
        let sqlGetUrl = "SELECT avatarUrl FROM User WHERE userID=?";
        mysql.query(sqlGetUrl, [userID], function(error, result) {
            if(result =! "http://localhost:3000/images/avatar.png") {
                let exAvatar = result[0].avartarUrl.split("/images/")[1];
                //remplacement de l'URL
                sqlChangeAvatar = "UPDATE User SET avatarUrl=? WHERE userID=?";
                mysql.query(sqlChangeAvatar, [avartarUrl, userID], function (error, result) {
                    if(error) {
                        return res.status(501).json(error.message)
                    } else {
                        return res.status(200).json({ message: "Avatar modifié !"})
                    }
                })
            }
        })    
        } else {
        res.status(404).json({ message: "La modification n'a pas pu aboutir" })
    }
}