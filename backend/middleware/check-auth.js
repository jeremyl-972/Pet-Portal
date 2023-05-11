const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

const secretCode = 'super_secret_dont_share';

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next();
    };
    try {
        const token = req.headers.authorization.split(' ')[1];//Authorization: 'Bearer TOKEN'
        if (!token) {
            return next(new Error('Authentication failed'));
        };

        const decodedToken = jwt.verify(token, secretCode);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        return next(new HttpError('Authentication failed', 401));
    };
};