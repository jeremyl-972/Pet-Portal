const mongoose = require('mongoose');
const petSchema = new mongoose.Schema({
        //_id: {type: String, required: true},
        type: {type: String, required: true},
        name: {type: String, required: true},
        status: {type: String, required: true},
        image: {type: String},
        breed: {type: String, required: true},
        height: {type: Number, required: true},
        weight: {type: Number, required: true},
        color: {type: String, required: true},
        bio: {type: String, required: true},
        hypoall: {type: String, required: true},
        dietno: {type: String},
        userId: {type: String}
});

module.exports = mongoose.model('Pet', petSchema);