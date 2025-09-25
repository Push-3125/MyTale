module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    display_name: DataTypes.STRING,
    role: { type: DataTypes.ENUM('user','admin'), defaultValue: 'user' }
  }, { tableName: 'users', underscored: true });
  return User;
};
