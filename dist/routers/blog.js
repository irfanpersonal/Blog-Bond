"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const blog_1 = require("../controllers/blog");
const authentication_1 = __importDefault(require("../middleware/authentication"));
router.route('/').get(blog_1.getAllBlogPosts).post(authentication_1.default, blog_1.createBlogPost);
router.route('/getUserFeed').get(authentication_1.default, blog_1.getUserFeed);
router.route('/:id').get(blog_1.getSingleBlogPost).patch(authentication_1.default, blog_1.updateSingleBlogPost).delete(authentication_1.default, blog_1.deleteSingleBlogPost);
exports.default = router;
