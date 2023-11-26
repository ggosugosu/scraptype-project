'use strict';
import mysql2 from 'mysql2';
import { Sequelize } from 'sequelize';


const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER_NAME,
  process.env.DB_PASSWORD,
  {
    'host': process.env.DB_HOST,
    'dialect': process.env.DB_DIALECT,
    'dialectModule': mysql2,
    'define': {
      'underscored': true
    }
  }
);

const User = require('./user').default(sequelize, Sequelize);
const Font = require('./font').default(sequelize, Sequelize);
const Tag = require('./tag').default(sequelize, Sequelize);
const FontTag = require('./font_tag').default(sequelize, Sequelize);
const WebFont = require('./web_font').default(sequelize, Sequelize);
const ImageFont = require('./image_font').default(sequelize, Sequelize);


// Association
Font.hasMany(FontTag, { targetKey: 'id', foreignKey: 'font_id', as: 'fontTags' });
Font.hasOne(WebFont, { targetKey: 'id', foreignKey: 'font_id', as: 'webFont' });
Font.hasOne(ImageFont, { targetKey: 'id', foreignKey: 'font_id', as: 'imageFont' });
Tag.hasMany(FontTag, { targetKey: 'id', foreignKey: 'tag_id', as: 'fontTags' });
FontTag.belongsTo(Font, { foreignKey: 'font_id', as: 'fonts' });
FontTag.belongsTo(Tag, { foreignKey: 'tag_id', as: 'tags' });
WebFont.belongsTo(Font, { foreignKey: 'font_id', as: 'font' });
ImageFont.belongsTo(Font, { foreignKey: 'font_id', as: 'font' });


module.exports = { sequelize, Sequelize, User, Font, Tag, FontTag, WebFont, ImageFont };