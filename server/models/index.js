'use strict';

const options = require("../config/option");
const Sequelize = require("sequelize");
const db = {};
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const dbData = {
    host: options.storageConfig.host,
    user: options.storageConfig.username,
    password: options.storageConfig.password,
    database: options.storageConfig.database,
  };

const sequelize = new Sequelize(
    options.storageConfig.database,
    options.storageConfig.username,
    options.storageConfig.password,
    config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Font = require("./font")(sequelize, Sequelize);

module.exports = db;``