const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    //_id: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true, unique:true, collation:{ locale: 'en_US', strength: 1 }},
    password: {type: String, required: true},
    bio: {type: String},
    savedPets:{type:Array}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);