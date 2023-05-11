const { check } = require('express-validator');

const createPetValidator =
    [
        check('type').not().isEmpty(),
        check('name').not().isEmpty(),
        check('status').not().isEmpty(),
        check('image').not().isEmpty(),
        check('breed').not().isEmpty(),
        check('height').isNumeric(),
        check('weight').isNumeric(),
        check('color').not().isEmpty(),
        check('bio').not().isEmpty(),
        check('hypoall').isBoolean({loose:true})
    ];

const updatePetValidator = 
[
    check('type').not().isEmpty(),
    check('name').not().isEmpty(),
    check('status').not().isEmpty(),
    check('image').not().isEmpty(),
    check('breed').not().isEmpty(),
    check('height').isNumeric(),
    check('weight').isNumeric(),
    check('color').not().isEmpty(),
    check('bio').not().isEmpty(),
    check('hypoall').isBoolean({loose:true})
];

exports.createPetValidator = createPetValidator;
exports.updatePetValidator = updatePetValidator;