"use strict";

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      title: DataTypes.STRING,
      isbn: DataTypes.STRING,
      image: DataTypes.STRING,
      author: DataTypes.STRING,
      createdby: {
        type: DataTypes.INTEGER,
        references: { model: "user", key: "id" },
      },
    },
    {}
  );
  Book.associate = (models) => {
    Book.belongsTo(models.user, {
      foreignKey: "createdby",
      target: "id",
      onDelete: "CASCADE",
    });
  };
  return Book;
};
