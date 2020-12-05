const mysql = require('../dbConnect').connection; //Connexion à la bd
const dotenv = require("dotenv").config();
const bcrypt = require('bcrypt'); // Pour crypter le mot de passe
const jwt = require('jsonwebtoken'); // Génère un token sécurisé
const fs = require('fs'); // Permet de gérer les fichiers stockés
const passwordValidator = require("password-validator");
const emailValidator = require("email-validator");

//Création du schéma de mot de passe
const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(5) // 6 caractères min
    .is().max(20) // 12 caractères max
    .has().not().spaces() // Pas d'espace

// Création de l'utilisateur et hashage du mot de passe
exports.signup = (req, res, next) => {
    //Messages d'erreur si champ non validé
    if(!emailValidator.validate((req.body.email))) {
        return res.status(400).json({ message: "Assurez-vous d'avoir entré une adresse email valide"})        
    }
    else if (!passwordSchema.validate((req.body.password))) {
        return res.status(400).json({ message: "Votre mot de passe doit contenir au moins 5 caractères"})        
    } else {
        //Hashage x10 du mdp + salage
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                let userProfile = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash,
                };
                let sqlCheck = `SELECT * FROM User WHERE email = '${userProfile.email}'`;
                mysql.query(sqlCheck, function(error, result) {
                    if(error) {
                        return res.status(501).json({ message: "Erreur du serveur. Veuillez réésayer plus tard."})
                    }
                    if(result[0]) {
                        return res.status(401).json({ message: "Un compte a déjà été créé avec cet email !"})
                    } else {
                        let sqlCreateUser =
                        `INSERT INTO User (firstName, lastName, email, password, dateCreation)
                        VALUES ('${userProfile.firstName}', '${userProfile.lastName}', '${userProfile.email}', '${userProfile.password}', NOW())`;
                        mysql.query(sqlCreateUser, function(error, result) {
                            if(error) {
                                return res.status(501).json({ message:'Erreur de notre serveur. Veuillez réessayer dans quelques instants.'})
                            } if(result) {
                                res.status(201).json({
                                    userID: result.insertId,
                                    token: jwt.sign(
                                        { userID: result.insertId },
                                        process.env.TOKEN,
                                        { expiresIn: "24h" }
                                    )
                                })
                            }
                        })
                    }
                }) 
            })
            .catch(error => {
                return res.status(501).json({ message:'Erreur de notre serveur. Veuillez réésayer plus tard.'})
            }) 
    }
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
            return res.status(500).json({ message: "Erreur sur notre serveur. Veuillez réessayer plus tard." });
        }
        else if(result.length == 0) {
            return res.status(404).json({ message: "Vous n'êtes pas encore inscrit"})
        }
        //si le mot de passe correspond, renvoyer un token
        else {
            bcrypt.compare(passwordLogin, result[0].password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({ message: "Votre mot de passe est incorrect." })
                }
                return res.status(200).json({
                    userID: result[0].userID,
                    token: jwt.sign(
                        { userID: result[0].userID },
                        process.env.TOKEN,
                        { expiresIn: "24h" }
                    )
                })
            })
            .catch(error => res.status(500).json(error))
        }
    })
};

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
    let userID = req.params["id"]
    let updatedProfile = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };
    console.log(updatedProfile); 
    let sqlModify = "UPDATE User SET firstName = IFNULL(?, firstName), lastName = IFNULL (?, lastName) WHERE userID = ?";
    let values = [updatedProfile.firstName, updatedProfile.lastName, userID];
    mysql.query(sqlModify, values, function(error, result) {
        if (error) {
            res.status(500).json(error.message);
        }
        if (result.affectedRows == 0) {
            res.status(400).json({ message: "La modification n'a pas pu aboutir" });
        }
        else {
            // si la MaJ a été effectuée, renvoyer toutes les données
            let sqlGet = "SELECT * FROM User WHERE userID=?";
            mysql.query(sqlGet, [userID], function(error, result) {
                if (error) {
                    res.status(500).json(error.message);
                } else {
                    res.status(200).json(result); 
                }
            })
        }
    })
};

//Met à jour l'avatar depuis la page profil
exports.avatar = (req, res, next) => {
    const newAvartarUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const userID = req.params["id"];
    //recherche de l'avatar actuel pour pouvoir le supprimer 
    let sqlExUrl = "SELECT avatarUrl FROM User WHERE userID=?";
    mysql.query(sqlExUrl, [userID], function(error, result) {
        if(error){
            return res.status(500).json(error)
        } else {
            let exAvatarName = result[0].avatarUrl.split("/images/")[1];
            let sqlChangeAvatar = "UPDATE User SET avatarUrl=? WHERE userID=?";
            if(exAvatarName != "avatar.png") {
                fs.unlink(`images/${exAvatarName}`, (error) => {
                    if(error) throw error;
                })
            } 
            mysql.query(sqlChangeAvatar, [newAvartarUrl, userID], function (error, result) {
                if(error) {
                    return res.status(501).json({message: "La modification n'a pas pu aboutir"})
                } else {
                    return res.status(201).json(newAvartarUrl)
                }
            })
        }
    })
};

// Suppresion d'un utilisateur
exports.delete = (req, res, next) => {
    let userID = req.params["id"];
    let sqlFindAvatar = `SELECT avatarUrl FROM User WHERE userID=${userID}`;
    mysql.query(sqlFindAvatar, function(error, result) {
        if(error){
            return res.status(500).json(error)
        } else {
            let avatarName = result[0].avatarUrl.split("/images/")[1];
            if(avatarName != "avatar.png") {
                fs.unlink(`images/${avatarName}`, (error) => {
                    if(error) throw error;
                })
            }
        }
    });
    let sqlDelete = "DELETE FROM User WHERE userID=?";
    mysql.query(sqlDelete, [userID], function(error, result) {
        if(error) {
            return res.status(500).json(error.message);
        } else {
            return res.status(200).json();
        }
    })
};