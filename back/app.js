//Déclarations des constantes pour l'utilisation des packages
const express = require("express");
const mongoose = require("mongoose");
const helmet = require('helmet');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');
const app = express();
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require("express-rate-limit");

//Utilisation de dotenv pour sécuriser les données sensibles
require('dotenv').config();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 100
});

//Connexion à la base de données mongoDB
mongoose
  .connect(
  process.env.SECRET_MONGO,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((e) => console.log("Connexion à MongoDB échouée !",));

  //Options de sécurité et possibilités des requêtes à envoyer
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();});

 // Utilisation helmet pour protéger l'application de vulnérabilités
app.use(helmet());

//Traite les données en format json
app.use(express.json());

//Protéger contre l'injection de requêtes NoSQL
app.use(mongoSanitize());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

//Protéger contre un grand nombre d'envois de données de manière malveillante
app.use(limiter);

module.exports = app;
