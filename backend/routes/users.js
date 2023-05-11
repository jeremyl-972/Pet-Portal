const express = require('express');

const userValidators = require('../validators/userValidators');
const usersController = require('../controllers/users-controller.js');
const savedPetsController = require('../controllers/saved_pets-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

//users routes

router.post('/', userValidators.signupValidator, usersController.userSignup);

router.post('/login', usersController.userLogin);//validation not needed(email and password are already being matched/compared)

router.get('/:userId', usersController.getUserById);

router.get('/full/:userId', usersController.getUserAndUserPets);

router.use(checkAuth);//for logged in users

router.put('/:userId', userValidators.updateUserValidator, usersController.updateUserById);//protected to loggedIn user

//saved pets
router.post('/saved/:userId', savedPetsController.savePetToUser);//protected to loggedIn user
router.post('/unsaved/:userId', savedPetsController.deletePetfromUser);//protected to loggedIn user

//another middleware for admin goes here

router.get('/', usersController.getAllUsers);//protected to admin


module.exports = router;

// router.patch('/:userId', (req, res) => {
//     const id = req.params.userId;
//     const data = req.body;

//     users.updateCol(id, data.key, data.value);

//     res.send('User Col Updated');
// });

// router.delete('/:userId', (req, res) => {
//     const id = req.params.userId;

//     users.del(id);

//     res.send('User Deleted!');
// });




