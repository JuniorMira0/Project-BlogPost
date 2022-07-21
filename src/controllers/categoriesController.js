const { Category } = require('../database/models');

const createCategories = async (req, res) => {
  const { name } = req.body;
  const categories = await Category.create({ name });

  return res.status(201).json(categories);
};

module.exports = {
  createCategories,
};
