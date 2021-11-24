const mongoose = require ('mongoose');
const passwordValidator = require('password-validator');
const uniqueValidator = require('mongoose-unique-validator');
const passwordSchema = new passwordValidator();
const validator = require("email-validator");
 
validator.validate("test@email.com");

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}  
});

userSchema.plugin(uniqueValidator);

passwordSchema
.is().min(8)                                    
.is().max(30)                                  
.has().uppercase()                              
.has().lowercase()                              
.has().digits()                                
.has().not().spaces()                           


module.exports = mongoose.model("User", userSchema);
module.exports = passwordSchema;