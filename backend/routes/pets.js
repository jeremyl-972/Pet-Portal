const express = require('express');

const petValidators = require('../validators/petValidators');
const petsController = require('../controllers/pets-controller');
const checkAuth = require('../middleware/check-auth');
const multerUpload = require('../middleware/multer');

const router = express.Router();

//pets routes
router.get('/', petsController.getAllPets);

router.get('/search', petsController.getPetsByFilter);

router.get('/user/:userId', petsController.getPetsByUserId);

router.get('/:petId', petsController.getPetById);

router.use(checkAuth);//protected to logged in users middleware

router.post('/adopt/:userId', petsController.adoptByUserId);//protected to loggedIn user

router.post('/foster/:userId', petsController.fosterByUserId);//protected to loggedIn user

router.post('/return/:userId', petsController.returnPet);//protected to loggedIn user

//protect to admin middleware

router.post('/', multerUpload.upload.single('image'), petValidators.createPetValidator, petsController.createPet);//protected to admin

router.put('/:petId', multerUpload.upload.single('image'), petValidators.updatePetValidator, petsController.updatePetById);//protected to admin

module.exports = router;

// router.patch('/:petId', (req, res) => {
//     const id = req.params.petId;
//     const data = req.body;

//     pets.updateCol(id, data.key, data.value);

//     res.send('Pet Col Updated');
// });
