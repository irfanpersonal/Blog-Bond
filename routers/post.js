const express = require('express');
const router = express.Router();

const {getAllPosts, getUserSpecificPosts, createPost, getSinglePost, updateSinglePost, deleteSinglePost} = require('../controllers/post.js');
const authenticationMiddleware = require('../middleware/authentication.js');

router.route('/').get(getAllPosts).post(authenticationMiddleware, createPost);
router.route('/user').get(authenticationMiddleware, getUserSpecificPosts);
router.route('/:id').get(getSinglePost).patch(authenticationMiddleware, updateSinglePost).delete(authenticationMiddleware, deleteSinglePost);

module.exports = router;