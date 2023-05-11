const cloudinary = require('cloudinary').v2

const DB = require('../db');
const HttpError = require('../models/http-error');
const savedPetsController = require('../controllers/saved_pets-controller');
const multerUpload = require('../middleware/multer');
const uploader = cloudinary.uploader;

const PetSchema = require('../models/pets');

const petsDB = new DB(PetSchema);
//create
const createPet = async (req, res, next) => {
    const obj = req.body;
    if (!req.file) {
        return next(new HttpError('We need the file, bro', 400));
    };
    console.log('req.file:', req.file);

    const file = multerUpload.dataUri(req).content;
    const result = await uploader.upload(file);
   
    //const result = await cloudinary.uploader.upload(req.file.path);

    //const adjustedPath = `uploads/images/${req.file.filename}`;
    //const newPet = await petsDB.add({ ...obj, image: adjustedPath });
    const newPet = await petsDB.add({ ...obj, image: result.url });
    res.status(201).json({ newPet: newPet });
};
//read

const getAllPets = async (req, res, next) => {
    const allPets = await petsDB.get();
    if (!allPets || allPets.length === 0) {
        return next(new HttpError('Could not find any pets', 404));
    };
    res.json({ pets: allPets });
};

const getPetById = async (req, res, next) => {
    const pet = await petsDB.getById(req.params.petId);
    if (!pet) {
        return next(new HttpError('Could not find a pet for the provided id', 404));
    }
    res.json({ pet });
};

const getPetsByuserId = async (req, res, next) => {
    const petArray = await petsDB.getByUserId(req.params.userId);
    if (petArray.length === 0) {
        return next(new HttpError('Could not find a pet for the provided user id', 404));
    }
    res.json({ petArray });
};

const getPetsByFilter = async (req, res, next) => { //get pets that match query params
    console.log(req.query);
    const { type, name, status, height, weight } = req.query;

    let constructedQuery = { type: type };

    if (name) { constructedQuery.name = { $regex: name, $options: 'i' } };
    if (status !== 'undefined') { constructedQuery.status = status };
    if (height !== 'undefined') { constructedQuery.height = { $lte: parseInt(height) } };
    if (weight !== 'undefined') { constructedQuery.weight = { $lte: parseInt(weight) } };

    const queryResult = await petsDB.findMany(constructedQuery);

    res.send({ petsArray: queryResult });
};
//update
const updatePetById = async (req, res, next) => {//by admin
    const _id = req.params.petId;
    const { type, name, status, breed, height, weight, color, bio, hypoall, dietno } = req.body;
    const updatedPet = await petsDB.update(_id);
    const adjustedPath = `uploads/images/${req.file.filename}`;
    if (!updatedPet) {
        return next(new HttpError('Could not find a pet for the provided id', 404));
    };
    let doc = updatedPet.doc;
    doc.type = type;
    doc.name = name;
    doc.status = status;
    doc.image = adjustedPath;
    doc.breed = breed;
    doc.height = height;
    doc.weight = weight;
    doc.color = color;
    doc.bio = bio;
    doc.hypoall = hypoall;
    doc.dietno = dietno;
    try {
        updatedPet.save();
    } catch (error) {
        return next(new HttpError('Could not update. Please try again.', 404));
    }
    res.json({ updatedPet: doc });
};

const adoptByUserId = async (req, res) => {//by logged in user
    const userId = req.params.userId;
    const { status, _id } = req.body;
    await savedPetsController.delPetFromUserSavedPetsOnAdoptOrFoster(userId, _id);

    if (status === 'Adopted') {
        return next(new HttpError('too late for this one, son'));
    }
    if (status === 'Available' || 'Fostered') {
        const adoptedPet = await petsDB.update(_id);
        if (!adoptedPet) {
            return next(new HttpError('Could not find a pet for the provided id', 404));
        };
        let doc = adoptedPet.doc;
        doc.status = "Adopted";
        doc.userId = userId;
        try {
            adoptedPet.save();
        } catch (error) {
            return next(new HttpError('Could not update. Please try again', 404));
        }
        res.status(200).json({ pet: doc });
    };
}

const fosterByUserId = async (req, res, next) => {
    const userId = req.params.userId;
    const { status, _id } = req.body;
    await savedPetsController.delPetFromUserSavedPetsOnAdoptOrFoster(userId, _id);

    if (status === 'Adopted' || status === 'Fostered') {
        return next(new HttpError('Too late for this one, son'));
    }
    if (status === 'Available') {
        const fosteredPet = await petsDB.update(_id);
        if (!fosteredPet) {
            return next(new HttpError('Could not find a pet for the provided id', 404));
        };
        let doc = fosteredPet.doc;
        doc.status = "Fostered";
        doc.userId = userId;

        try {
            fosteredPet.save();
        } catch (error) {
            return next(new HttpError('Could not update. Please try again.', 404));
        }
        res.status(200).json({ pet: doc });
    };
}

const returnPet = async (req, res, next) => {
    const { status, _id } = req.body;
    if (status === 'Available') {
        return next(new HttpError('You cannot give back something that is not yours, son'));
    }
    if (status === 'Fostered' || status === 'Adopted') {
        const unavailablePet = await petsDB.update(_id);
        if (!unavailablePet) {
            return next(new HttpError('Could not find a pet for the provided id', 404))
        };
        if (req.userData.userId !== unavailablePet.doc.userId) {
            return next(new HttpError('You cannot return someone elses pet.', 404));
        };

        let doc = unavailablePet.doc;
        doc.status = "Available";
        doc.userId = "";
        try {
            unavailablePet.save();
        } catch (error) {
            return next(new HttpError('Could not update. Please try again.', 404));
        }
        res.status(200).json({ pet: doc });
    };
}

exports.createPet = createPet;
exports.getAllPets = getAllPets;
exports.getPetById = getPetById;
exports.getPetsByUserId = getPetsByuserId;
exports.getPetsByFilter = getPetsByFilter;
exports.updatePetById = updatePetById;
exports.adoptByUserId = adoptByUserId;
exports.fosterByUserId = fosterByUserId;
exports.returnPet = returnPet;