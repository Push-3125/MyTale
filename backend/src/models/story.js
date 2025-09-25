module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    cover: DataTypes.STRING,
    genre: DataTypes.STRING,
    tags: DataTypes.STRING,
    status: { type: DataTypes.ENUM('draft','pending','published'), defaultValue: 'pending' }
  }, { tableName: 'stories', underscored: true });
  return Story;
};
