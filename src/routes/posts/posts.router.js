const express = require('express');

const {
  createPostValidator,
  updatePostValidator
} = require('../../utils/validators');
const { validatePost } = require('../../middleware/validate-post');

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById
} = require('./posts.controller');

const router = express.Router();

router.get('', getAllPosts);
router.get('/:id', getPostById);
router.put('', updatePostValidator, validatePost, updatePostById);
router.post('', createPostValidator, validatePost, createPost);
router.delete('', deletePostById);

module.exports = {
  postsRouter: router
};
