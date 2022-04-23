const { Tag } = require("../models/index");

Tag.sequelize
  .sync()
  .then(() => {
    console.log("sequelize success");
  })
  .catch((err) => {
    console.log("sequelize fail", err);
  });

const tagDTO = {
  getAllTag: () => {
    const getTags = Tag.findAll();
    return getTags;
  },
  getTag: async (_, args) => {
    await context.Tag.findOne();
    const { id } = args;
    const resultData = await Tag.findOne({ where: { id: id } });
    return resultData;
  },
  createTag: async (_, { name, description }) => {
    // TODO: 같은 글자가 있을 경우 추가x (where not exist)
        const newTag = await Tag.create({
      name
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

module.exports = tagDTO;
