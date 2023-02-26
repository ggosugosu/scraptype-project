const { GraphQLError } = require("graphql");
const { FontTag, Font, Tag } = require("../models");
const { Op } = require("sequelize");

const fontTagORM = {
  getFontTagAll: () =>
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

  getFontTags: ({ tag_ids }) => {
    const newFontTags = FontTag.findAll({
      where: {
        tag_id: {
          [Op.or]: tag_ids,
        },
      },
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
    });

    return newFontTags;
  },

  createFontTag: async ({ font_id, tag_id }) => {
    const newFontTag = await FontTag.create({
      font_id,
      tag_id,
    });

    if (await exists(font_id, tag_id))
      throw new GraphQLError("Data already exists.", "BAD_INPUT", {
        status: 400,
        error: true,
      });

    return newFontTag;
  },

  updateFontTag: async ({ font_id, tag_id }) => {
    try {
      const prevFontTags = await FontTag.findAll({ where: { font_id } });
      prevFontTags.map((prev) => prev.tag_id).includes(tag_id)
        ? FontTag.destroy({ where: { font_id: font_id, tag_id: tag_id } })
        : FontTag.create({ font_id, tag_id });
    } catch (e) {
      console.log(e.message);
      throw new GraphQLError("DB Error", "BAD_INPUT", {
        status: 500,
        error: true,
      });
    }

    return true;
  },

  deleteFontTag: async ({ id }) => {
    await FontTag.destroy({
      where: { id: id },
    }).then((data) => data);
  },
};

const exists = async (font_id, tag_id) =>
  await FontTag.findOne({ where: { font_id: font_id, tag_id: tag_id } })
    .then((data) => data !== null)
    .then((existsData) => existsData);

export default fontTagORM;
