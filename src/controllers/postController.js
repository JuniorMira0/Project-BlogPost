const { BlogPost, User, Category } = require('../database/models');

const getPost = async (req, res) => {
  const post = await BlogPost.findAll({ include: [
    { model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

  return res.status(200).json(post);
};

module.exports = {
  getPost,
};
