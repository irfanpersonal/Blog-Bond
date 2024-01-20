"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleBlogPost = exports.updateSingleBlogPost = exports.getSingleBlogPost = exports.createBlogPost = exports.getUserFeed = exports.getAllBlogPosts = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = __importDefault(require("../errors"));
const Blog_1 = __importDefault(require("../models/Blog"));
const cloudinary_1 = require("cloudinary");
const User_1 = __importDefault(require("../models/User"));
const node_fs_1 = __importDefault(require("node:fs"));
const getAllBlogPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, username, sort } = req.query;
    const queryObject = {};
    if (search) {
        queryObject.name = { $regex: search, $options: 'i' };
    }
    if (username) {
        queryObject.user = username;
    }
    let result = Blog_1.default.find(queryObject).populate({
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
    const blogs = yield result;
    const totalBlogs = yield Blog_1.default.countDocuments(queryObject);
    const numberOfPages = Math.ceil(totalBlogs / limit);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ blogs, totalBlogs, numberOfPages });
});
exports.getAllBlogPosts = getAllBlogPosts;
const getUserFeed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.query;
    const followingArray = (yield User_1.default.findOne({ _id: req.user.userID }).select('following'));
    const followingIds = followingArray.following.map(user => user.toString());
    const queryObject = {
        user: { $in: followingIds }
    };
    if (search) {
        queryObject.name = { $regex: search, $options: 'i' };
    }
    let result = Blog_1.default.find(queryObject).populate('user');
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const blogs = yield result;
    const totalBlogs = yield Blog_1.default.countDocuments(queryObject);
    const numberOfPages = Math.ceil(totalBlogs / limit);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ blogs, totalBlogs, numberOfPages });
});
exports.getUserFeed = getUserFeed;
const createBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, content } = req.body;
    if (!name || !content) {
        throw new errors_1.default.BadRequestError('Please provide name, content, and coverImage for blog creation!');
    }
    if (!((_a = req.files) === null || _a === void 0 ? void 0 : _a.coverImage)) {
        throw new errors_1.default.BadRequestError('Please provide a cover image!');
    }
    const coverImage = req.files.coverImage;
    if (!coverImage.mimetype.startsWith('image')) {
        throw new errors_1.default.BadRequestError('File must be an image!');
    }
    if (coverImage.size > 1000000 * 2) {
        throw new errors_1.default.BadRequestError('Image Size cannot be over 2MB!');
    }
    const uniqueIdentifier = new Date().getTime() + '_' + req.user.name + '_' + 'profile' + '_' + coverImage.name;
    const result = yield cloudinary_1.v2.uploader.upload(coverImage.tempFilePath, {
        public_id: uniqueIdentifier,
        folder: 'BLOG-BOND/COVER_IMAGES'
    });
    yield node_fs_1.default.unlink(coverImage.tempFilePath, (err) => {
        if (err) {
            console.log(err);
        }
    });
    req.body.coverImage = result.secure_url;
    req.body.user = req.user.userID;
    const blog = yield Blog_1.default.create(req.body);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ blog });
});
exports.createBlogPost = createBlogPost;
const getSingleBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const blog = yield Blog_1.default.findOne({ _id: id }).populate({
        path: 'user',
        select: 'name email profilePicture'
    });
    if (!blog) {
        throw new errors_1.default.NotFoundError('No Blog Found with the ID Provided!');
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ blog });
});
exports.getSingleBlogPost = getSingleBlogPost;
const updateSingleBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    const blog = yield Blog_1.default.findOne({ _id: id, user: req.user.userID }).populate('user');
    if (!blog) {
        throw new errors_1.default.NotFoundError('No Blog Found with the ID Provided!');
    }
    const { name, content } = req.body;
    if (name) {
        blog.name = name;
    }
    if (content) {
        blog.content = content;
    }
    if ((_b = req.files) === null || _b === void 0 ? void 0 : _b.coverImage) {
        const coverImage = req.files.coverImage;
        if (!coverImage.mimetype.startsWith('image')) {
            throw new errors_1.default.BadRequestError('File must be an image!');
        }
        if (coverImage.size > 1000000 * 2) {
            throw new errors_1.default.BadRequestError('Image Size cannot be over 2MB!');
        }
        const uniqueIdentifier = new Date().getTime() + '_' + req.user.name + '_' + 'profile' + '_' + coverImage.name;
        const oldImage = blog.coverImage.substring(blog.coverImage.indexOf('BLOG'));
        yield cloudinary_1.v2.uploader.destroy(oldImage.substring(0, oldImage.lastIndexOf('.')));
        const result = yield cloudinary_1.v2.uploader.upload(coverImage.tempFilePath, {
            public_id: uniqueIdentifier,
            folder: 'BLOG-BOND/COVER_IMAGES'
        });
        yield node_fs_1.default.unlink(coverImage.tempFilePath, (err) => {
            if (err) {
                console.log(err);
            }
        });
        blog.coverImage = result.secure_url;
    }
    yield blog.save();
    return res.status(http_status_codes_1.StatusCodes.OK).json({ blog });
});
exports.updateSingleBlogPost = updateSingleBlogPost;
const deleteSingleBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const blog = yield Blog_1.default.findOne({ _id: id, user: req.user.userID });
    if (!blog) {
        throw new errors_1.default.NotFoundError('No Blog Found with the ID Provided!');
    }
    const currentImage = blog.coverImage.substring(blog.coverImage.indexOf('BLOG'));
    yield cloudinary_1.v2.uploader.destroy(currentImage.substring(0, currentImage.lastIndexOf('.')));
    yield blog.deleteOne();
    return res.status(http_status_codes_1.StatusCodes.OK).send();
});
exports.deleteSingleBlogPost = deleteSingleBlogPost;
