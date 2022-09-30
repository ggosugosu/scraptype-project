const { Op } = require("sequelize");
const { Tag } = require("../models/index");
const { FontTag } = require("../models");
const { ApolloError } = require("apollo-server-micro");

const tagORM = {
    getTagAll: () => {
        return Tag.findAll({
            include: [
                {
                    model: FontTag,
                    as: 'fontTags'
                }
            ]
        });
    },

    getTagsByTagId: ({ tag_ids }) => {
        const newTags = Tag.findAll({
            where: {
                id: {
                    [Op.or]: tag_ids,
                },
            },
        });

        return newTags;
    },

    createTag: async ({ name }) => {
        if (await existsTagName((name))) throw new ApolloError('Data already exists.', 'BAD_INPUT', {
            status: 400,
            error: true
        });
        return await Tag.create({ name });
    },

    updateTag: async ({ id, name }) => {
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

module.exports = tagORM;
