const { Font, FontTag, Tag, WebFont } = require("../models/index");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

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
        {
          model: WebFont,
          as: "webFonts",
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
          where: {
            tag_id: {
              [Op.in]: tag_ids,
            },
          },
        },
      ],
    });

    return getFonts;
  },

  getFontsByCorpAndText: ({ corporation, text }) =>
    Font.findAll({
      where: {
        name: {
          [Op.like]: `%${text}%`,
        },
        corporation: {
          [Op.like]: `${corporation ? corporation : "%"}`,
        },
      },
    }).then((fonts) => fonts),

  getCorporationAll: () =>
    Font.findAll({
      attributes: ["corporation"],
      group: ["corporation"],
    }).then((corporation) => corporation),

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
