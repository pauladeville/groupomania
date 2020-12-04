//Importation du package de gestion des token
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();


//Fonction d'authentification des requêtes
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; //Récupération du token dans le header authorization (suppression du mot clé bearer)
        const decodedToken = jwt.verify(token, process.env.TOKEN); //Décodage du token en objet JS
        const userID = decodedToken.userID; //Extraction du userId depuis le token décodé
        res.locals.userID = decodedToken.userID;
        next();
    }
    catch (error) {
        res.status(401).json({error})
    }
};