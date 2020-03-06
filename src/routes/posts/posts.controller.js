const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

const postsData = require('../../db/data.json');

const PATH_TO_DATA = 'src/db/data.json';

const getAllPosts = (req, res) => {
  return res.json(postsData);
};

const getPostById = (req, res) => {
  const { id } = req.params;
  const postOrNull = postsData.find(post => String(post.id) === id);

  if (!postOrNull) {
    res.status(404).send('Post not found!');
  }
  return res.status(200).json(postOrNull);
};

const createPost = async (req, res) => {
  const id = postsData.length + 1;
  const newPost = {
    ...req.body,
    id
  };

  try {
    await await writeFile(
      PATH_TO_DATA,
      JSON.stringify([...postsData, newPost])
    );
  } catch (e) {
    res.status(503).send('Fail to add a new post');
  }

  return res.status(201).json(newPost);
};

const updatePostById = async (req, res) => {
  const { id } = req.body;
  const postOrNull = postsData.find(post => post.id === id);

  if (!postOrNull) {
    res.status(404).send('Post not found!');
  }

  const updatedPost = {
    ...postOrNull,
    ...req.body
  };

  const updateDatabase = postsData.map(post => {
    return post.id === id ? updatedPost : post;
  });

  try {
    await writeFile(PATH_TO_DATA, JSON.stringify(updateDatabase));
  } catch (e) {
    res.status(503).send('Fail to update a new post');
  }

  return res.status(200).json(updatedPost);
};

const deletePostById = async (req, res) => {
  const { id } = req.body;
  const postOrNull = postsData.find(post => post.id === id);

  if (!postOrNull) {
    res.status(404).send('Post not found!');
  }

  const updateDatabase = postsData.filter(post => id !== post.id);

  try {
    await writeFile(PATH_TO_DATA, JSON.stringify(updateDatabase));
  } catch (e) {
    res.status(503).send('Fail to delete post');
  }

  return res.status(200).json(id);
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById
};
