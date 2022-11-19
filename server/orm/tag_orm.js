const { Op } = require("sequelize");
const { Tag } = require("../models/index");
const { FontTag } = require("../models");
const { GraphQLError } = require("graphql");

const tagORM = {
  getTagAll: () => {
    return Tag.findAll({
      include: [
        {
          model: FontTag,
          as: "fontTags",
        },
      ],
    });
  },

  getTagsByTagId: ({ tag_ids }) => {
    return Tag.findAll({
      where: {
        id: {
          [Op.or]: tag_ids,
        },
      },
    });
  },

  createTag: async ({ name }) => {
    await checkExist(name);
    return await Tag.create({ name });
  },

  updateTag: async ({ id, name }) => {
    await checkExist(name);
    return await Tag.update({ id, name }, { where: { id } });
  },

  deleteTagByTagId: async ({ tag_id }) => {
    try {
      await FontTag.destroy({ where: { tag_id } });
      await Tag.destroy({ where: { id: tag_id } });
    } catch (e) {
      return false;
    }

    return true;
  },
};

const existsTagName = async (name) =>
  await Tag.findOne({ where: { name: name } })
    .then((data) => data !== null)
    .then((existsData) => existsData);

const checkExist = async (name) => {
  if (await existsTagName(name))
    throw new GraphQLError("Data already exists.", "BAD_INPUT", {
      status: 400,
      error: true,
    });
};

module.exports = tagORM;
