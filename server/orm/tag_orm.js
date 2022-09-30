const { Op } = require("sequelize");
const { Tag } = require("../models/index");
const { FontTag } = require("../models");

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

    getTag: async (_, args) => {
        await context.Tag.findOne();
        const { id } = args;
        const resultData = await Tag.findOne({ where: { id: id } });
        return resultData;
    },

    createTag: async ({id, name}) => {
        // TODO: 같은 글자가 있을 경우 추가x (where not exist)
        const newTag = await Tag.create({
            name,
        });
        const tag = await Tag.findOne({ where: { id: id } });
        return tag;
    },

    updateTag: async (_, { id, name, description }) => {
        console.log(id);
        const tag = await Tag.findOne({ where: { id: id } });
        return tag;
    },

    deleteTag: async (_, { id }) => {
        console.log(id);
        const oldTag = await Tag.destroy({ where: { id: id } });
        const tag = await Tag.findOne({ where: { id: id } });
        return tag;
    },
};



module.exports = tagORM;
