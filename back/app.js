const express = require("express");
const mongoose = require("mongoose");
const helmet = require('helmet');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');
const app = express();
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require("express-rate-limit");
require('dotenv').config();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 5
});

mongoose
  .connect(
  process.env.SECRET_MONGO,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((e) => console.log("Connexion à MongoDB échouée !",));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();});

app.use(helmet());
app.use(express.json());
//contre l'injection de requêtes NoSQL
app.use(mongoSanitize());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use(limiter);

module.exports = app;
