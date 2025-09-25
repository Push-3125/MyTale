const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(process.env.DB_NAME || 'mytale', process.env.DB_USER || 'root', process.env.DB_PASS || '', {
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'mysql',
  logging: false,
});

const db = { sequelize, Sequelize };

fs.readdirSync(__dirname)
  .filter(f => f !== 'index.js' && f.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

const { User, Story, Chapter, Comment, Rating, Tag, StoryTag } = db;

if (User && Story) {
  User.hasMany(Story, { foreignKey: 'author_id' });
  Story.belongsTo(User, { foreignKey: 'author_id' });
}
if (Story && Chapter) {
  Story.hasMany(Chapter, { foreignKey: 'story_id' });
  Chapter.belongsTo(Story, { foreignKey: 'story_id' });
}
if (User && Comment) {
  User.hasMany(Comment, { foreignKey: 'user_id' });
  Comment.belongsTo(User, { foreignKey: 'user_id' });
}
if (Story && Comment) {
  Story.hasMany(Comment, { foreignKey: 'story_id' });
  Comment.belongsTo(Story, { foreignKey: 'story_id' });
}
if (User && Rating) {
  User.hasMany(Rating, { foreignKey: 'user_id' });
  Rating.belongsTo(User, { foreignKey: 'user_id' });
}
if (Story && Rating) {
  Story.hasMany(Rating, { foreignKey: 'story_id' });
  Rating.belongsTo(Story, { foreignKey: 'story_id' });
}

module.exports = db;
