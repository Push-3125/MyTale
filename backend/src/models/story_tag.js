module.exports = (sequelize, DataTypes) => {
  const StoryTag = sequelize.define('StoryTag', {}, { tableName: 'story_tags', underscored: true, timestamps: false });
  return StoryTag;
};
