module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT
  }, { tableName: 'comments', underscored: true });
  return Comment;
};
