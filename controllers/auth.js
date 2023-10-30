const {StatusCodes} = require('http-status-codes');
const User = require('../models/User.js');
const {BadRequestError, UnauthorizedError, NotFoundError} = require('../errors');

const register = async(req, res) => {
    const user = await User.create(req.body);
    const token = user.createJWT();
    return res.status(StatusCodes.CREATED).json({user: {
        name: user.name,
        email: user.email,
        token
    }});
}

const login = async(req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please provide both email and password');
    }
    const user = await User.findOne({email});
    if (!user) {
        throw new NotFoundError('No User found with the email provided');
    }
    const isCorrect = await user.comparePassword(password);
    if (!isCorrect) {
        throw new UnauthorizedError('Invalid Password');
    }
    const token = user.createJWT();
    return res.status(StatusCodes.OK).json({user: {
        name: user.name,
        email: user.email,
        token
    }});
}

const updateUser = async(req, res) => {
    const {name, email} = req.body;
    if (!name || !email) {
        throw new BadRequestError('Pleaes provide both name and email!');
    }
    const user = await User.findOne({_id: req.user.userID});
    if (name) {
        user.name = name;
    }
    if (email) {
        user.email = email;
    }
    await user.save();
    const token = user.createJWT();
    return res.status(StatusCodes.OK).json({user: {
        name: user.name,
        email: user.email,
        token
    }});
}

module.exports = {
    register,
    login,
    updateUser
};