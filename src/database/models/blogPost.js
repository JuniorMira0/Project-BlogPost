'use strict';
const BlogPosts = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    published: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updated: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, 
  {
    timestamps: false,
    tableName: 'BlogPosts'
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {foreignKey: "userId", as: "user" })
  };

  return BlogPost;
};

module.exports = BlogPosts;