const { validationResult } = require('express-validator');
const postsData = require('../db/data.json');

const validatePost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(
      JSON.stringify({
        status: 'UNPROCESSABLE_ENTITY',
        message: errors.array()
      })
    );
  }
  next();
};

const findPostById = (req, res, next) => {
  const { id } = req.params;
  const postOrNull = postsData.find(post => String(post.id) === id);

  if (!postOrNull) {
    throw new Error(
      JSON.stringify({
        status: 'NOT_FOUND',
        message: 'Post not found!'
      })
    );
  } else {
    req.post = postOrNull;
  }
  next();
};

module.exports = {
  validatePost,
  findPostById
};
