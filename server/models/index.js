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
const WebFont = require("./web_font")(sequelize, Sequelize);
const ImageFont = require("./image_font")(sequelize, Sequelize);


// Association
Font.hasMany(FontTag, {targetKey: 'id', foreignKey: 'font_id', as: 'fontTags'});
Font.hasOne(WebFont, {targetKey: 'id', foreignKey: 'font_id', as: 'webFont'});
Font.hasOne(ImageFont, {targetKey: 'id', foreignKey: 'font_id', as: 'imageFont'});
Tag.hasMany(FontTag);
FontTag.belongsTo(Font, {foreignKey: 'font_id', as: 'fonts'});
FontTag.belongsTo(Tag, {foreignKey: 'tag_id', as: 'tags'});
WebFont.belongsTo(Font, {foreignKey: 'font_id', as: 'font'});
ImageFont.belongsTo(Font, {foreignKey: 'font_id', as: 'font'});


module.exports = {sequelize, Sequelize, Font, Tag, FontTag, WebFont, ImageFont};