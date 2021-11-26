const mongoose = require ('mongoose');
const passwordValidator = require('password-validator');
const uniqueValidator = require('mongoose-unique-validator');
const passwordSchema = new passwordValidator();
const validator = require("email-validator");
 
validator.validate("test@email.com");
//Modèle de l'utilisateur pour l'inscription et l'identification
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}  
});

//Permet d'utiliser qu'une fois une adresse mail pour un compte
userSchema.plugin(uniqueValidator);

//Modèle du format de mot de passe requis
passwordSchema
.is().min(8)                                    
.is().max(30)                                  
.has().uppercase()                              
.has().lowercase()                              
.has().digits()                                
.has().not().spaces()                           


module.exports = mongoose.model("User", userSchema);
module.exports = passwordSchema;