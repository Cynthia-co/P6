const express = require('express');
const router = express.Router();

//Déclaration du controller requis
const userCtrl = require('../controllers/users');

//Déclaration des routes middleware à utiliser
const checkemail = require('../middleware/checkemail'); 
const checkpassword = require('../middleware/checkpassword');

//Mise en place des routes pour l'inscription et la connexion
router.post('/signup', checkemail, checkpassword, userCtrl.signup);
router.post('/login', checkemail, checkpassword, userCtrl.login);

module.exports = router;