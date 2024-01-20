import {StatusCodes} from 'http-status-codes';
import {Request, Response} from 'express';
import {createToken, createCookieWithToken} from '../utils';
import User from '../models/User';
import CustomError from '../errors';
import {v2 as cloudinary} from 'cloudinary';
import {UploadedFile} from 'express-fileupload';
import {IUser} from '../models/User';
import fs from 'node:fs';

const register = async(req: Request<unknown, unknown, IUser>, res: Response) => {
    const {name} = req.body;
    // Check if Profile Picture is Provided
    if (!req.files?.profilePicture) {
        throw new CustomError.BadRequestError('Please provide a profile picture!');
    }
    const profilePicture = req.files.profilePicture as UploadedFile;
    // Restrict User from Uploading a File that is NOT an Image
    if (!profilePicture.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('File Type Must be Image!');
    }
    // Restrict User from Uploading an Image over 2MB
    if (profilePicture.size > 1000000 * 2) {
        throw new CustomError.BadRequestError('Image Size cannot exceed 2MB!');
    }
    const uniqueIdentifier = new Date().getTime() + '_' + name + '_' + 'profile' + '_' + profilePicture.name;
    req.body.profilePicture = 'SETTING A VALUE FOR NOW SO I CAN SATISFY MONGOOSE';
    const user = await User.create(req.body);
    const result = await cloudinary.uploader.upload(profilePicture.tempFilePath, {
        public_id: uniqueIdentifier, // Setting File Name
        folder: 'BLOG-BOND/PROFILE_IMAGES' // Where the File should be saved, so folder wise
    });
    user.profilePicture = result.secure_url;
    await user.save();
    // Delete File from "tmp" folder
    await fs.unlink(profilePicture.tempFilePath, (err) => {
        if (err) {
            console.log(err);
        }
    });
    const token = createToken(user);
    createCookieWithToken(res, token);
    return res.status(StatusCodes.CREATED).json({user: {
        userID: user._id,
        name: user.name,
        email: user.email
    }});
}

interface LoginRequest extends Request {
    body: {
        email: string,
        password: string
    }
}

const login = async(req: LoginRequest, res: Response) => {
    const {email, password} = req.body;
    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide email and password!');
    }
    const user = await User.findOne({email});
    if (!user) {
        throw new CustomError.BadRequestError('No User Found with the Email Provided!');
    }
    const isCorrect = await user.comparePassword(password);
    if (!isCorrect) {
        throw new CustomError.BadRequestError('Incorrect Password!');
    }
    const token = createToken(user);
    createCookieWithToken(res, token);
    return res.status(StatusCodes.OK).json({user: {
        userID: user._id,
        name: user.name,
        email: user.email
    }});
}

const logout = async(req: Request, res: Response) => {
    res.clearCookie('token');
    return res.status(StatusCodes.OK).json({msg: 'Successfully Logged Out!'});
}

export {
    register,
    login,
    logout
};