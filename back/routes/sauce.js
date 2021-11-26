const express = require("express");
const router = express.Router();

//Déclaration des middleware requis
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Déclaration des controller requis
const sauceCtrl = require("../controllers/sauces");

//Mise en place des routes selon les requêtes des utilisateurs
router.post("/",  multer, sauceCtrl.createSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/", auth, sauceCtrl.getAllSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likesDislikes)

module.exports = router;
