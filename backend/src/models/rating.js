module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    rating: { type: DataTypes.TINYINT, allowNull: false }
  }, { tableName: 'ratings', underscored: true });
  return Rating;
};
