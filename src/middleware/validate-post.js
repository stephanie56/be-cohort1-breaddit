const { validationResult } = require('express-validator');

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

module.exports = {
  validatePost
};
