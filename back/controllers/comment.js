const mysql = require('../dbConnect').connection;

// Créer des commentaires
exports.createComment = (req, res, next) => {
    let commentText = req.body.commentText;
    let postID = req.params["id"];
    let userID = res.locals.userID;
    let sqlNewComment = `INSERT INTO Comment (userID, postID, commentText, dateSend) VALUES (${userID}, ${postID}, "${commentText}", NOW())`;
    mysql.query(sqlNewComment, function(error, result) {
        if(error) {
            return res.status(501).json(error); 
        } if(result) {
            return res.status(201).json(result);
        }
    })
};

// Récupérer des commentaires
exports.getAllComments = (req, res, next) => {
    let postID = req.params["id"];
    let sqlGetComments = `SELECT postID, commentID FROM Comment WHERE postID = ${ postID }`;
    mysql.query(sqlGetComments, function(error, result) {
        if(error) {
            return res.status(404).json(error);
        }
        else {
            return res.status(200).json(result);
        }
    })
};

// Récupérer un commentaire
exports.getOneComment = (req, res, next) => {
    let postID = req.params["id"];
    let commentID = req.params["ref"];
    let sqlGetComment = `SELECT * FROM Comment WHERE postID = ${ postID } && commentID = ${ commentID }`;
    mysql.query(sqlGetComment, function(error, result) {
        if(error) {
            return res.status(404).json(error);
        }
        else {
            return res.status(200).json(result);
        } 
    }) 
};

// Supprimer un message 
exports.deleteComment = (req, res, next) => {
    let postID = req.params["id"];
    let commentID = req.params["ref"];
    let sqlDeleteCom = `DELETE FROM Comment WHERE postID=${postID} && commentID=${commentID}`;
    mysql.query(sqlDeleteCom, function(error, result) {
        if(error) {
            return res.status(500).json(error);
        } else {
            return res.status(200).json(result);
        }
    })
};