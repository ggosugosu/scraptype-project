const { ApolloError } = require("apollo-server-micro");
const font = require("../models/font");
const { FontTag, Font, Tag } = require("../models/index");
const tag = require("../models/tag");

FontTag.sequelize
  .sync()
  .then(() => {
    console.log("sequelize success");
  })
  .catch((err) => {
    console.log("sequelize fail", err);
  });

const fontTagORM = {
  getFontTagAll:() =>
    FontTag.findAll({
      include: [
        {
          model: Font,
          as: "fonts",
        },
        {
          model: Tag,
          as: "tags",
        },
      ],
    }).then((data) => data),

  createFontTag: async ({ font_id, tag_id }) => {
    if (!exists(font_id, tag_id)) throw new ApolloError("Data already exists.", "BAD_INPUT", { status: 400, error: true });

    const newFontTag = await FontTag.create({
      font_id,
      tag_id,
    });

    return newFontTag;
  },

  deleteFontTag: async ({ font_id, tag_id }) => {
    const oldFontTag = await FontTag.destroy({ font_id, tag_id });
    return exists(font_id, tag_id);
  },
};

const exists = (font_id, tag_id) => FontTag.findOne({ where: { font_id: font_id, tag_id: tag_id } });

module.exports = fontTagORM;
