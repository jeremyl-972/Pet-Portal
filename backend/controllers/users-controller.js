const { validationResult } = require('express-validator');
const UserModel = require('../models/users');
const PetModel = require('../models/pets');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const DB = require('../db');
const HttpError = require('../models/http-error');

const usersDB = new DB(UserModel);
const petsDB = new DB(PetModel);

const secretCode = 'super_secret_dont_share';

//create
const userSignup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs, please check yo-self', 422));
    };

    const { firstName, lastName, phone, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await usersDB.find({ email: email });
    } catch (error) {
        next(new HttpError('Signup failed. Please try again later.', 500));
    };

    if (existingUser) {
        return next(new HttpError('Email already exists', 422));
    };

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        return next(new HttpError('Could not create user. Please try again.', 500));
    };

    const constructedUser = { ...req.body, password: hashedPassword };
    const newUser = await usersDB.add(constructedUser);

    let token;
    try {
        token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            secretCode,
            { expiresIn: '1h' }
        );
    } catch (error) {
        return next(new HttpError('Signup failed. Please try again later.', 500));
    };

    res.status(201).json({ user: newUser, token: token });
};

const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    let identifiedUser;
    try {
        identifiedUser = await usersDB.find({ email: email });
    } catch (error) {
        next(new HttpError('Login failed. Please try again later.', 500));
    };

    if (!identifiedUser) {
        return next(new HttpError('Credentials are incorrect', 403));
    };

    let isValidPassword;
    try {
        isValidPassword = await bcrypt.compare(password, identifiedUser.password)
    } catch (error) {
        return next(new HttpError('Credentials are incorrect'));
    };

    if (!isValidPassword) {
        return next(new HttpError('Credentials are incorrect', 403));
    };

    let token;
    try {
        token = jwt.sign(
            { userId: identifiedUser.id, email: identifiedUser.email },
            secretCode,
            { expiresIn: '1h' }
        );
    } catch (error) {
        return next(new HttpError('Login failed. Please try again later.', 500));
    };

    res.json({ user: identifiedUser, token:token });
};
//read
const getAllUsers = async (req, res, next) => {
    const allUsers = await usersDB.get();
    if (!allUsers || allUsers.length === 0) {
        return next(new HttpError('Could not find any users', 404));
    };
    res.json({ users: allUsers.map(i => i.toObject({ getters: true })) });
};

const getUserById = async (req, res, next) => {
    const user = await usersDB.getById(req.params.userId);
    if (!user) {
        return next(new HttpError('Could not find a user for the provided id', 404));
    };
    res.json({ user: user });
};

const getUserAndUserPets = async (req, res, next) => {
    const id = req.params.userId
    const user = await usersDB.getById(id);
    if (!user) {
        return next(new HttpError('Could not find a user for the provided id', 404));
    };
    const allPets = await petsDB.get();
    const userPets = allPets.filter(p => p.userId === id);
    let petsArray = [];
    userPets.map(p => petsArray.push(p));
  
    res.json({ user: user, userPets: petsArray });
};
//update
const updateUserById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs, please check yo-self', 422));
    };

    const id = req.params.userId;
    const item = req.body;
    const hasUser = await usersDB.find({ email: item.email });

    if (hasUser && hasUser._id != id) {
        return next(new HttpError('Email is already in use', 422));
    }

    const updatedUser = await usersDB.update(id);
    if (!updatedUser) {
        return next(new HttpError('Could not find a user for the provided id', 404));
    };
    let doc = updatedUser.doc;
    doc.firstName = item.firstName;
    doc.lastName = item.lastName;
    doc.phone = item.phone;
    doc.email = item.email;
    doc.password = item.password;
    if (item.bio) { doc.bio = item.bio };
    try {
        updatedUser.save();
    } catch (error) {
        return next(new HttpError('Could not update. Please try again.', 404));
    }
    res.json({ doc: doc });
};

exports.userSignup = userSignup;
exports.userLogin = userLogin;
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.getUserAndUserPets = getUserAndUserPets;
exports.updateUserById = updateUserById;