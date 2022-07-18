'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, 
  {
    tableName: 'Categories'
  });
  return Categories;
}; 