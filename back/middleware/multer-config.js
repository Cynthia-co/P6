//Déclaration de la constante pour utiliser multer
const multer = require('multer');
//Types d'images supportés
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//Renommer les images et les stocker
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    const name = file.originalname.split('').join('').split('.'+extension).join('_');
    
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage}).single('image');