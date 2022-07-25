'use strict';
const PostCategories = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "BlogPosts",
        key: "id"
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Categories",
        key: "id"
      },
    },  
  }, 
  {
    timestamps: false,
    tableName: 'PostCategories'
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'postId',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  
  return PostCategory;
};

module.exports = PostCategories;