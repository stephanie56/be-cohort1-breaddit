const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

const postsData = require('../../db/data.json');

const getAllPosts = (req, res) => {
  return res.json(postsData);
};

const getPostById = (req, res) => {
  const { id } = req.params;
  const postOrNull = postsData.find(post => post.id === id);

  if (!postOrNull) {
    res.status(404).send('Post not found!');
  } else {
    res.status(200);
    return res.json(postOrNull);
  }
};

const createPost = async (req, res) => {
  const id = postsData.length + 1;
  const newPost = {
    ...req.body,
    id
  };

  await writeFile('src/db/data.json', JSON.stringify([...postsData, newPost]));

  res.status(201);

  return res.json(newPost);
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost
};
