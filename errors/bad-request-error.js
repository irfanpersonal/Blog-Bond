const CustomError = require('./custom-error.js');
const {StatusCodes} = require('http-status-codes');

class BadRequestError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

module.exports = BadRequestError;