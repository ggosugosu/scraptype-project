const { Font, FontTag, Tag } = require("../models/index");
const { Op } = require("sequelize");

const fontORM = {
  getFontAll: () => {
    const getFonts = Font.findAll({
      include: [
        {
          model: FontTag,
          as: "fontTags",
          include: [
            {
              model: Tag,
              as: "tags",
            },
          ],
        },
      ],
    });
    return getFonts;
  },

  getFont: async (_, args) => {
    await context.Font.findOne();
    const { id } = args;
    const resultData = await Font.findOne({ where: { id: id } });
    return resultData;
  },
  
  getFontsByTagId: ({ tag_ids }) => {
    const newFontTags = Font.findAll({
      include: [
        {
          model: FontTag,
          as: "fontTags",
          include: [
            {
              model: Tag,
              as: "tags",
            },
          ],
          where: {
            tag_id: {
              [Op.or]: tag_ids,
            },
          },
        },
      ],
    });

    return newFontTags;
  },

  createFont: async (_, { name, description }) => {
    const newFont = await Font.create({
      name,
      description,
    });

    const font = await Font.findOne({ where: { id: id } });
    return font;
  },

  updateFont: async (_, { id, name, description }) => {
    console.log(id);
    const font = await Font.findOne({ where: { id: id } });
    return font;
  },

  deleteFont: async (_, { id }) => {
    console.log(id);
    const oldFont = await Font.destroy({ where: { id: id } });
    const font = await Font.findOne({ where: { id: id } });
    return font;
  },
};

module.exports = fontORM;
