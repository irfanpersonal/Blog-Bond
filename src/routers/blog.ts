import express from 'express';
const router: express.Router = express.Router();

import {getAllBlogPosts, getUserFeed, createBlogPost, getSingleBlogPost, updateSingleBlogPost, deleteSingleBlogPost} from '../controllers/blog';
import authenticationMiddleware from '../middleware/authentication';

router.route('/').get(getAllBlogPosts).post(authenticationMiddleware, createBlogPost);
router.route('/getUserFeed').get(authenticationMiddleware, getUserFeed);
router.route('/:id').get(getSingleBlogPost).patch(authenticationMiddleware, updateSingleBlogPost).delete(authenticationMiddleware, deleteSingleBlogPost);

export default router;