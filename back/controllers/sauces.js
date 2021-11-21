const Sauce = require("../models/sauces");
const fs = require("fs");

//Créer une nouvelle sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    //Récupérer l'image
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    //initialiser les valeurs de like et dislike 
    likes: 0,
    dislikes: 0,
    usersLiked: [' '],
    usersdisLiked: [' ']
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
  
};

//Obtenir une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
  
};

//Récupérer toutes les sauces
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
  
};

//Modifier les informations d'une sauce et mettre à jour
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
  
};


//Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((thing) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
  
};


//Liker et disliker une sauce
exports.likesDislikes = (req, res, next) => {
  if (req.body.like === 1) {  // J'aime
    Sauce.updateOne( {_id:req.params.id}, { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } })
      .then(() => res.status(200).json({ message: 'Like ajouté !'}))
      .catch(error => res.status(400).json({ error }));
} else if (req.body.like === -1) {  // Je n'aime pas
    Sauce.updateOne( {_id:req.params.id}, { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: +1 } })
      .then(() => res.status(200).json({ message: 'Dislike ajouté !'}))
      .catch(error => res.status(400).json({ error }));
} else {  // Je n'ai plus d'avis
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        if (sauce.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne( {_id:req.params.id}, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
            .then(() => res.status(200).json({ message: 'Like supprimé !'}))
            .catch(error => res.status(400).json({ error }))
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne( {_id:req.params.id}, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
            .then(() => res.status(200).json({ message: 'Dislike supprimé !'}))
            .catch(error => res.status(400).json({ error }))
        }
      })
      .catch(error => res.status(400).json({ error }));
}}