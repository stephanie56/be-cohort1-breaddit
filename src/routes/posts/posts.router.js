const express = require('express');

const {
  createPostValidator,
  updatePostValidator
} = require('../../utils/validators');
const {
  validatePost,
  findPostById
} = require('../../middleware/validate-post');

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById
} = require('./posts.controller');

const router = express.Router();

router.get('', getAllPosts);
router.get('/:id', findPostById, getPostById);
router.put(
  '/:id',
  updatePostValidator,
  validatePost,
  findPostById,
  updatePostById
);
router.post('', createPostValidator, validatePost, createPost);
router.delete('/:id', findPostById, deletePostById);

module.exports = {
  postsRouter: router
};
