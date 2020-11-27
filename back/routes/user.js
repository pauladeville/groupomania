const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

//Importation des middleware d'authentification et de gestion des fichiers entrants
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//Application des fonctions pour chaque route + authentification pour toutes les routes + gestion des fichiers entrants pour les routes concernées (post / put)
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/:id", userCtrl.delete);
router.get("/:id", userCtrl.profile);
router.put("/:id", multer, userCtrl.modify);

module.exports = router;