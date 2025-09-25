require('dotenv').config();
const { sequelize } = require('../models');

async function sync() {
  try {
    await sequelize.sync({ force: true });
    console.log('DB synced (force:true)');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

sync();
