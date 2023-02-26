const { Font, FontTag, Tag, WebFont, ImageFont } = require("../models");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

const fontORM = {
  getFontByFontId: ({ font_id }) =>
    Font.findOne({
      where: { id: font_id },
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
          as: "webFont",
        },
        {
          model: ImageFont,
          as: "imageFont",
        },
      ],
    }).then((data) => data),

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
          as: "webFont",
        },
        {
          model: ImageFont,
          as: "imageFont",
        },
      ],
    });
    return getFonts;
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

  deleteFontByFontId: async ({ font_id }) => {
    try {
      await ImageFont.destroy({ where: { font_id } });
      await WebFont.destroy({ where: { font_id } });

      await FontTag.destroy({ where: { font_id } });

      await Font.destroy({ where: { id: font_id } });
    } catch (e) {
      return false;
    }

    return true;
  },

  createFont: async (_, { name, description }) => {
    const newFont = await Font.create({
      name,
      description,
    });

    const font = await Font.findOne({ where: { id } });
    return font;
  },

  updateFont: async (_, { id, name, description }) => {
    console.log(id);
    const font = await Font.findOne({ where: { id } });
    return font;
  },

  deleteFont: async (_, { id }) => {
    console.log(id);
    const oldFont = await Font.destroy({ where: { id } });
    const font = await Font.findOne({ where: { id } });
    return font;
  },
};

export default fontORM;
