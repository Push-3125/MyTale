module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define('Chapter', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    chapter_index: DataTypes.INTEGER
  }, { tableName: 'chapters', underscored: true });
  return Chapter;
};
