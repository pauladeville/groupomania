const mysql = require('../dbConnect').connection;
const fs = require("fs"); // Permet de gérer les fichiers stockés

// Obtenir tous les messages
exports.getAllPosts = (req, res, next) => {
};

// Obtenir un message
exports.getOnePost = (req, res, next) => {
    let postID = req.params["id"];
    let sqlGetPost = `SELECT * FROM Post WHERE postID=${postID}`;
    mysql.query(sqlGetPost, function(error, result) {
        if(error) {
            return res.status(404).json(error.message);
        }
        else {
            return res.status(200).json(result);
        }
    })
};


// Créer un message
exports.createPost = (req, res, next) => {
    let newPost = {
        title: req.body.title,
        gifUrl: req.body.gifUrl,
        text: req.body.text
    };
    let userID = res.locals.userID;
    let sqlNewPost = `INSERT INTO Post (userID, gifUrl, postTitle, postText, dateSend) VALUES (${userID}, '${newPost.gifUrl}', '${newPost.title}', '${newPost.text}', NOW())`;
    mysql.query(sqlNewPost, function(error, result) {
        if(error) {
            return res.status(501).json({ message: "Votre message n'a pas été publié. Veuillez réessayer dans quelques instants."});
        } else {
            return res.status(201).json({ message: "Votre publication est maintenant visible par vos collègues."});
        }
    }) 
};

// Supprimer un message 
exports.deletePost = (req, res, next) => {
};

// Créer des commentaires
exports.createComment = (req, res, next) => {
};

// Gestion des likes
exports.likePost = (req, res, next) => {
};