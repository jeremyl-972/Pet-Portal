const { check } = require('express-validator');

const signupValidator =
    [
        check('firstName').not().isEmpty(),
        check('lastName').not().isEmpty(),
        check('phone').not().isEmpty(),
        check('email').notEmpty(),
        check('password').isLength({ min: 6 }),
        check('repassword').isLength({ min: 6 })
    ];

const updateUserValidator =
    [
        check('firstName').not().isEmpty(),
        check('lastName').not().isEmpty(),
        check('phone').not().isEmpty(),
        check('email').not().isEmpty(),
        check('password').isLength({ min: 6 })
    ];

exports.signupValidator = signupValidator;
exports.updateUserValidator = updateUserValidator;