import { Sequelize } from 'sequelize';
import config from '../config.js';
import fs from 'fs';
import path from 'path';

// If using MySql

  const sequelize = new Sequelize(config.dbSchema, config.dbUser, config.dbPwd, {
  host: config.dbServer,
  dialect: 'mysql',
  port: config.dbPort,
});


/* ------------------------------------------------------
// Since the SQLite database will be created if it does not exist, ensure the database folder exists
const directoryPath = path.dirname(config.sqliteDbUrl);
if (!fs.existsSync(directoryPath)) {
  try {
    fs.mkdirSync(directoryPath);
    console.log(`Created directory: ${directoryPath}`);
  } catch (err) {
    console.log(`Unable to create directory: ${directoryPath} - ${err}`);
  }
}

// Use SQLite which will create the database.sqlite file if it does not exist
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.sqliteDbUrl,
});
-------------------------------------------------------- */
export default sequelize;
