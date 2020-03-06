const { check } = require('express-validator');

const createPostValidator = [
  check('title', 'Title field is required')
    .not()
    .isEmpty()
    .isString(),
  check('author', 'Author field is required')
    .not()
    .isEmpty()
    .isString(),
  check('score').isNumeric(),
  check('image').isString()
];

const updatePostValidator = [
  check('title').isString(),
  check('author').isString(),
  check('score').isNumeric(),
  check('image').isString()
];

module.exports = {
  createPostValidator,
  updatePostValidator
};
