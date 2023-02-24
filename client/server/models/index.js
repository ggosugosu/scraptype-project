'use strict';
import options from '../config/options';
import { Sequelize } from "sequelize";


console.log(options);

const sequelize = new Sequelize(
  options.database,
  options.username,
  options.password,
  {
    "host": options.host,
    "dialect": "mysql",
    "define": {
      "underscored": true
    }
  }
);

const Font = require("./font")(sequelize, Sequelize);
const Tag = require("./tag")(sequelize, Sequelize);
const FontTag = require("./font_tag")(sequelize, Sequelize);
const WebFont = require("./web_font")(sequelize, Sequelize);
const ImageFont = require("./image_font")(sequelize, Sequelize);


// Association
Font.hasMany(FontTag, { targetKey: 'id', foreignKey: 'font_id', as: 'fontTags' });
Font.hasOne(WebFont, { targetKey: 'id', foreignKey: 'font_id', as: 'webFont' });
Font.hasOne(ImageFont, { targetKey: 'id', foreignKey: 'font_id', as: 'imageFont' });
Tag.hasMany(FontTag, { targetKey: 'id', foreignKey: 'tag_id', as: 'fontTags' });
FontTag.belongsTo(Font, { foreignKey: 'font_id', as: 'fonts' });
FontTag.belongsTo(Tag, { foreignKey: 'tag_id', as: 'tags' });
WebFont.belongsTo(Font, { foreignKey: 'font_id', as: 'font' });
ImageFont.belongsTo(Font, { foreignKey: 'font_id', as: 'font' });


module.exports = { sequelize, Sequelize, Font, Tag, FontTag, WebFont, ImageFont };