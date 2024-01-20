import {StatusCodes} from 'http-status-codes';
import {Request, Response} from 'express';
import CustomError from '../errors';
import Blog, {IBlog} from '../models/Blog';
import {ITokenPayload} from '../utils';
import mongoose from 'mongoose';
import {UploadedFile} from 'express-fileupload';
import {v2 as cloudinary} from 'cloudinary';
import User from '../models/User';
import fs from 'node:fs';

interface IGetAllBlogPosts extends Request {
    query: {
        search: string,
        username: string,
        sort: 'a-z' | 'z-a',
        limit: string,
        page: string
    }
}

interface IQueryObject {
    name: {$regex: string, $options: string},
    user: string
}

const getAllBlogPosts = async(req: IGetAllBlogPosts, res: Response) => {
    const {search, username, sort} = req.query;
    const queryObject: Partial<IQueryObject> = {}
    if (search) {
        queryObject.name = {$regex: search, $options: 'i'};
    }
    if (username) {
        queryObject.user = username;
    }
    let result = Blog.find(queryObject).populate({
        path: 'user',
        select: 'name email profilePicture'
    });
    if (sort === 'a-z') {
        result = result.sort('name');
    }
    if (sort === 'z-a') {
        result = result.sort('-name');
    }
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const blogs = await result;
    const totalBlogs = await Blog.countDocuments(queryObject);
    const numberOfPages = Math.ceil(totalBlogs / limit);
    return res.status(StatusCodes.OK).json({blogs, totalBlogs, numberOfPages});
}

interface IGetUserFeedRequest extends Request {
    user?: ITokenPayload,
    query: {
        search: string,
        username: string,
        sort: 'a-z' | 'z-a',
        limit: string,
        page: string
    }
}

interface GetUserFeedQueryObject {
    user: {$in: string[]},
    name: {$regex: string, $options: string}
}

const getUserFeed = async(req: IGetUserFeedRequest, res: Response) => {
    const {search} = req.query;
    const followingArray = (await User.findOne({_id: req.user!.userID}).select('following'))!;
    const followingIds = followingArray.following.map(user => user.toString());
    const queryObject: Partial<GetUserFeedQueryObject> = {
        user: {$in: followingIds}
    }
    if (search) {
        queryObject.name = {$regex: search, $options: 'i'};
    }
    let result = Blog.find(queryObject).populate('user');
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const blogs = await result;
    const totalBlogs = await Blog.countDocuments(queryObject);
    const numberOfPages = Math.ceil(totalBlogs / limit);
    return res.status(StatusCodes.OK).json({blogs, totalBlogs, numberOfPages});
}

interface ICreateBlogPost extends Request {
    user?: ITokenPayload,
    body: IBlog
}

const createBlogPost = async(req: ICreateBlogPost, res: Response) => {
    const {name, content} = req.body;
    if (!name || !content) {
        throw new CustomError.BadRequestError('Please provide name, content, and coverImage for blog creation!');
    }
    if (!req.files?.coverImage) {
        throw new CustomError.BadRequestError('Please provide a cover image!');
    }
    const coverImage = req.files.coverImage as UploadedFile;
    if (!coverImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('File must be an image!');
    }
    if (coverImage.size > 1000000 * 2) {
        throw new CustomError.BadRequestError('Image Size cannot be over 2MB!');
    }
    const uniqueIdentifier = new Date().getTime() + '_' + req.user!.name + '_' + 'profile' + '_' + coverImage.name;
    const result = await cloudinary.uploader.upload(coverImage.tempFilePath, {
        public_id: uniqueIdentifier, 
        folder: 'BLOG-BOND/COVER_IMAGES'
    });
    await fs.unlink(coverImage.tempFilePath, (err) => {
        if (err) {
            console.log(err);
        }
    });
    req.body.coverImage = result.secure_url;
    req.body.user = req.user!.userID as unknown as mongoose.Schema.Types.ObjectId;
    const blog = await Blog.create(req.body);
    return res.status(StatusCodes.CREATED).json({blog});
}

interface IGetSingleBlogPost extends Request {
    params: {
        id: string
    }
}

const getSingleBlogPost = async(req: IGetSingleBlogPost, res: Response) => {
    const {id} = req.params;
    const blog = await Blog.findOne({_id: id}).populate({
        path: 'user',
        select: 'name email profilePicture'
    });
    if (!blog) {
        throw new CustomError.NotFoundError('No Blog Found with the ID Provided!');
    }
    return res.status(StatusCodes.OK).json({blog});
}

interface IUpdateSingleBlogPostRequest extends Request {
    user?: ITokenPayload
    params: {id: string},
    body: IBlog
}

const updateSingleBlogPost = async(req: IUpdateSingleBlogPostRequest, res: Response) => {
    const {id} = req.params;
    const blog = await Blog.findOne({_id: id, user: req.user!.userID}).populate('user');
    if (!blog) {
        throw new CustomError.NotFoundError('No Blog Found with the ID Provided!');
    }
    const {name, content} = req.body;
    if (name) {
        blog.name = name;
    }
    if (content) {
        blog.content = content;
    }
    if (req.files?.coverImage) {
        const coverImage = req.files.coverImage as UploadedFile;
        if (!coverImage.mimetype.startsWith('image')) {
            throw new CustomError.BadRequestError('File must be an image!');
        }
        if (coverImage.size > 1000000 * 2) {
            throw new CustomError.BadRequestError('Image Size cannot be over 2MB!');
        }
        const uniqueIdentifier = new Date().getTime() + '_' + req.user!.name + '_' + 'profile' + '_' + coverImage.name;
        const oldImage = blog.coverImage.substring(blog.coverImage.indexOf('BLOG'));
        await cloudinary.uploader.destroy(oldImage.substring(0, oldImage.lastIndexOf('.')));
        const result = await cloudinary.uploader.upload(coverImage.tempFilePath, {
            public_id: uniqueIdentifier,
            folder: 'BLOG-BOND/COVER_IMAGES'
        });
        await fs.unlink(coverImage.tempFilePath, (err) => {
            if (err) {
                console.log(err);
            }
        });
        blog.coverImage = result.secure_url;
    }
    await blog.save();
    return res.status(StatusCodes.OK).json({blog});
}

interface IDeleteSinglePostRequest extends Request {
    user?: ITokenPayload,
    params: {id: string},
    body: IBlog
}

const deleteSingleBlogPost = async(req: IDeleteSinglePostRequest, res: Response) => {
    const {id} = req.params;
    const blog = await Blog.findOne({_id: id, user: req.user!.userID});
    if (!blog) {
        throw new CustomError.NotFoundError('No Blog Found with the ID Provided!');
    }
    const currentImage = blog.coverImage.substring(blog.coverImage.indexOf('BLOG'));
    await cloudinary.uploader.destroy(currentImage.substring(0, currentImage.lastIndexOf('.')));
    await blog.deleteOne();
    return res.status(StatusCodes.OK).send();
}

export {
    getAllBlogPosts,
    getUserFeed,
    createBlogPost,
    getSingleBlogPost,
    updateSingleBlogPost,
    deleteSingleBlogPost
};