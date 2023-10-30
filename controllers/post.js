const {StatusCodes} = require('http-status-codes');
const Post = require('../models/Post.js');
const {BadRequestError, NotFoundError} = require('../errors');
const cloudinary = require('cloudinary').v2;
const path = require('node:path');
const fs = require('node:fs');

const getAllPosts = async(req, res) => {
    const {search} = req.query;
    const queryObject = {};
    if (search) {
        queryObject.name = {$regex: search, $options: 'i'};
    }
    let result = Post.find(queryObject);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const posts = await result.populate('createdBy');
    const totalPosts = await Post.countDocuments(queryObject);
    const numberOfPages = Math.ceil(totalPosts / limit);
    return res.status(StatusCodes.OK).json({posts, totalPosts, numberOfPages});
}

const getUserSpecificPosts = async(req, res) => {
    const queryObject = {createdBy: req.user.userID};
    let result = Post.find(queryObject);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const posts = await result.populate('createdBy');
    const totalPosts = await Post.countDocuments(queryObject);
    const numberOfPages = Math.ceil(totalPosts / limit);
    return res.status(StatusCodes.OK).json({posts, totalPosts, numberOfPages});
}

const createPost = async(req, res) => {
    if (!req?.files?.image) {
        throw new BadRequestError('Please provide all inputs!');
    }
    const image = req.files.image;
    // Check Image Type
    if (!image.mimetype.startsWith('image')) {
        throw new BadRequestError('File Must Be Image!');
    }
    // Check File Size
    const limit = 1000000 * 2;
    if (image.size > limit) {
        throw new BadRequestError('Image Must Be Below 2MB!');
    }
    const uniqueName = new Date().getTime() + '_' + image.name;
    const destination = path.join(__dirname, '../images', uniqueName);
    await image.mv(destination);
    const result = await cloudinary.uploader.upload(destination, {
        use_filename: true,
        folder: 'BLOG-API-IMAGES'
    });
    await fs.unlink(destination, (err) => {
        if (err) {
            console.log(err);
        }
    });
    req.body.coverImage = result.secure_url;
    req.body.createdBy = req.user.userID;
    const post = await Post.create(req.body);
    return res.status(StatusCodes.CREATED).json({post});
}

const getSinglePost = async(req, res) => {
    const {id} = req.params;
    const post = await Post.findOne({_id: id}).populate('createdBy');
    if (!post) {
        throw new NotFoundError('No Post Found that matches the provided ID');
    }
    return res.status(StatusCodes.OK).json({post});
}

const updateSinglePost = async(req, res) => {
    const {id} = req.params;
    const post = await Post.findOne({_id: id});
    const {name, content} = req.body;
    if (name) {
        post.name = name;
    }
    if (content) {
        post.content = content;
    }
    if (req?.files?.image) {
        // Delete Previous Image
        const imageIdentifier = post.coverImage.split('/BLOG-API-IMAGES/')[1].split('.')[0];
        await cloudinary.uploader.destroy(`BLOG-API-IMAGES/${imageIdentifier}`);
        const image = req.files.image;
        // Check Image Type
        if (!image.mimetype.startsWith('image')) {
            throw new BadRequestError('File Must Be Image!');
        }
        // Check File Size
        const limit = 1000000 * 2;
        if (image.size > limit) {
            throw new BadRequestError('Image Must Be Below 2MB!');
        }
        const uniqueName = new Date().getTime() + '_' + image.name;
        const destination = path.join(__dirname, '../images', uniqueName);
        await image.mv(destination);
        // Upload New Image
        const result = await cloudinary.uploader.upload(destination, {
            use_filename: true,
            folder: 'BLOG-API-IMAGES'
        });
        await fs.unlink(destination, (err) => {
            if (err) {
                console.log(err);
            }
        });
        post.coverImage = result.secure_url;
    }
    await post.save();
    return res.status(StatusCodes.OK).json({post});
}

const deleteSinglePost = async(req, res) => {
    const {id} = req.params;
    const post = await Post.findOneAndDelete({_id: id});
    if (!post) {
        throw new NotFoundError('No Post Found that matches the provided ID');
    }
    const imageIdentifier = post.coverImage.split('/BLOG-API-IMAGES/')[1].split('.')[0];
    await cloudinary.uploader.destroy(`BLOG-API-IMAGES/${imageIdentifier}`);
    return res.status(StatusCodes.OK).send();
}

module.exports = {
    getAllPosts,
    getUserSpecificPosts,
    createPost,
    getSinglePost,
    getAllPosts,
    updateSinglePost,
    deleteSinglePost
};