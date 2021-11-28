const express = require('express');
const router = express.Router();

//Déclaration du controller requis
const userCtrl = require('../controllers/users');

//Mise en place des routes pour l'inscription et la connexion
router.post('/signup', userCtrl.signup);
router.post('/login',  userCtrl.login);

module.exports = router;