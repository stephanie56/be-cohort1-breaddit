const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

const postsData = require('../../db/data.json');

const PATH_TO_DATA = 'src/db/data.json';

const getAllPosts = (req, res) => {
  return res.json(postsData);
};

const getPostById = (req, res) => {
  return res.status(200).json(req.post);
};

const createPost = async (req, res) => {
  const id = postsData.length + 1;
  const newPost = {
    ...req.body,
    id
  };

  try {
    await writeFile(PATH_TO_DATA, JSON.stringify([...postsData, newPost]));
  } catch (e) {
    throw new Error(
      JSON.stringify({
        status: 'SERVICE_UNAVAILABLE',
        message: 'Fail to add a new post'
      })
    );
  }

  return res.status(201).json(newPost);
};

const updatePostById = async (req, res) => {
  const { id } = req.params;
  const updatedPost = {
    ...req.post,
    ...req.body
  };

  const updateDatabase = postsData.map(post => {
    return post.id === id ? updatedPost : post;
  });

  try {
    await writeFile(PATH_TO_DATA, JSON.stringify(updateDatabase));
  } catch (e) {
    throw new Error(
      JSON.stringify({
        status: 'SERVICE_UNAVAILABLE',
        message: 'Fail to update a new post'
      })
    );
  }

  return res.status(200).json(updatedPost);
};

const deletePostById = async (req, res) => {
  const { id } = req.params;
  const updatedDatabase = postsData.filter(post => id !== post.id);

  try {
    await writeFile(PATH_TO_DATA, JSON.stringify(updatedDatabase));
  } catch (e) {
    throw new Error(
      JSON.stringify({
        status: 'SERVICE_UNAVAILABLE',
        message: 'Fail to delete a new post'
      })
    );
  }

  return res.status(200).json({ id });
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById
};
