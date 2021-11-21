const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require("../controllers/sauces");

router.post("/",  multer, sauceCtrl.createSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/", auth, sauceCtrl.getAllSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likesDislikes)

module.exports = router;
