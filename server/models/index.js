'use strict';

const options = require("../config/option");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(
    options.storageConfig.database,
    options.storageConfig.username,
    options.storageConfig.password,
    config,
);

const Font = require("./font")(sequelize, Sequelize);
const Tag = require("./tag")(sequelize, Sequelize);
const FontTag = require("./font_tag")(sequelize, Sequelize);


// Association
Font.hasOne(FontTag);
Tag.hasOne(FontTag);
FontTag.belongsTo(Font, {foreignKey: 'font_id', as: 'fonts'});
FontTag.belongsTo(Tag, {foreignKey: 'tag_id', as: 'tags'});

module.exports = {sequelize, Sequelize, Font, Tag, FontTag};