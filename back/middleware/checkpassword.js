const passwordValidator = require('password-validator');
const passwordSchema = new passwordValidator();

//Modèle du format de mot de passe requis
passwordSchema
.is().min(8)                                    
.is().max(100)                                  
.has().uppercase()                              
.has().lowercase()                              
.has().digits()                                
.has().not().spaces()   

module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    }else{
        return res.status(400).json({error: `Le mot de passe doit contenir au min 8 caractères dont 1 majuscule, 1 chiffre, pas d'espace`});
    }
}