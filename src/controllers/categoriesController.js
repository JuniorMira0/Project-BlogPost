const { Category } = require('../database/models');

const createCategories = async (req, res) => {
  const { name } = req.body;
  const categories = await Category.create({ name });

  return res.status(201).json(categories);
};

const getCategories = async (req, res) => {
  const categoriesList = await Category.findAll();

    return res.status(200).json(categoriesList);
};

module.exports = {
  createCategories,
  getCategories,
};
