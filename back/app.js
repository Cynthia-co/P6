const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
mongoose
  .connect(
    'mongodb+srv://cluster0.re2if.mongodb.net/Cluster0" --username <users>',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.post("/api/stuff", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Objet créé !",
  });
  next();
});

app.use("/api/sauces", (req, res, next) => {
  const sauces = [
    {
      _id: "oeihfzeoi",
      name: "Mon premier objet",
      manufacturer: "",
      description: "",
      mainPepper: "",
      imageUrl: "",
      heat: 3,
      likes: 3,
      dislikes: 4,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl: "",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(sauces);
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: "Votre requête a bien été reçue !" });
  next();
});

app.use((req, res, next) => {
  console.log("Réponse envoyée avec succès !");
});

module.exports = app;
