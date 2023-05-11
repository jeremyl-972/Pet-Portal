const DB = require('../db');
const HttpError = require('../models/http-error');
const UserSchema = require('../models/users');

const usersDB = new DB(UserSchema);

const savePetToUser = async (req, res, next) => {
    const uid = req.params.userId;
    const userObject = await usersDB.getById(uid);
    const pet = req.body;
    if(pet.status === 'Adopted'){
        return next(new HttpError('Cannot save a pet that has been adopted', 404));
    };

    const savedPets = [...userObject.savedPets, pet];

    const updatedUser = await usersDB.update(uid);
    if (!updatedUser) {
        return next(new HttpError('Could not find a user for the provided id', 404));
    };
    let doc = updatedUser.doc;
    doc.savedPets = savedPets;
    try {
        updatedUser.save();
    } catch (error) {
        return next(new HttpError('Could not update. Please try again.', 404));
    }

    res.status(200).json({ user: doc });
};

const deletePetfromUser = async (req, res, next) => {
    const uid = req.params.userId;
    const userObject = await usersDB.getById(uid);
    const pet = req.body;

    const savedPets = userObject.savedPets.filter(p => p._id !== pet._id);

    const updatedUser = await usersDB.update(uid);
    if (!updatedUser) {
        return next(new HttpError('Could not find a user for the provided id', 404));
    };
    let doc = updatedUser.doc;
    doc.savedPets = savedPets;
    try {
        updatedUser.save();
    } catch (error) {
        return next(new HttpError('Could not update. Please try again.', 404));
    }

    res.status(200).json({ user: doc });
};

const delPetFromUserSavedPetsOnAdoptOrFoster = async (uid, pid) => { 
    const userObject = await usersDB.getById(uid);
    const petId = pid;
    const savedPets = userObject.savedPets.filter(p => p._id !== petId);
    const updatedUser = await usersDB.update(uid);
    if (!updatedUser) {
        throw new HttpError('Could not find a user for the provided id', 404);
    };
    let doc = updatedUser.doc;
    doc.savedPets = savedPets;
    try {
        updatedUser.save();
    } catch (error) {
        throw new HttpError('Could not update. Please try again.', 404);
    }
 };

exports.savePetToUser = savePetToUser;
exports.deletePetfromUser = deletePetfromUser;
exports.delPetFromUserSavedPetsOnAdoptOrFoster = delPetFromUserSavedPetsOnAdoptOrFoster;