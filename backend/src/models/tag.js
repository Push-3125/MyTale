module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: { type: DataTypes.STRING, unique: true }
  }, { tableName: 'tags', underscored: true });
  return Tag;
};
