const {UnauthorizedError} = require('../errors');
const jwt = require('jsonwebtoken');

const authentication = async(req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            throw new UnauthorizedError('Missing/Invalid Bearer Token');
        }
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {userID, name, email} = decoded;
        req.user = {userID, name, email};
        next();
    }
    catch(error) {
        throw new UnauthorizedError('Not authorized to access this route!');
    }
}

module.exports = authentication;