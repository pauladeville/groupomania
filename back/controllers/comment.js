const db = require('../dbConnect');

// Créer un commentaire
exports.createComment = (req, res, next) => {
    let commentText = req.body.commentText;
    let postID = req.params["id"];
    let userID = res.locals.userID;
    let sqlNewComment =
        `INSERT INTO Comment (userID, postID, commentText, dateSend)
        VALUES (${userID}, ${postID}, "${commentText}", NOW())`;
    db.query(sqlNewComment, function(error, result) {
        if (error) {
            return res.status(501).json(error);
        }
        if (result) {
            return res.status(201).json(result);
        }
    })
};

// Récupérer la liste des commentaires pour un post
exports.getAllComments = (req, res, next) => {
    let postID = req.params["id"];
    let sqlGetComments =
        `SELECT postID, commentID FROM Comment
        WHERE postID = ${ postID }`;
    db.query(sqlGetComments, function(error, result) {
        if (error) {
            return res.status(404).json(error);
        }
        if (result) {
            return res.status(200).json(result);
        }
    })
};

// Récupérer un commentaire
exports.getOneComment = (req, res, next) => {
    let postID = req.params["id"];
    let commentID = req.params["ref"];
    let sqlGetComment =
        `SELECT * FROM Comment
        WHERE postID = ${ postID } && commentID = ${ commentID }`;
    db.query(sqlGetComment, function(error, result) {
        if (error) {
            return res.status(404).json(error);
        }
        if (result) {
            return res.status(200).json(result);
        }
    })
};

// Supprimer un message 
exports.deleteComment = (req, res, next) => {
    let postID = req.params["id"];
    let commentID = req.params["ref"];
    let sqlDeleteCom =
        `DELETE FROM Comment
        WHERE postID=${postID} && commentID=${commentID}`;
    db.query(sqlDeleteCom, function(error, result) {
        if (error) {
            return res.status(500).json(error);
        }
        if (result) {
            return res.status(200).json(result);
        }
    })
};