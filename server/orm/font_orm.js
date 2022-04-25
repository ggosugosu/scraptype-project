const { Font } = require("../models/index");

const fontORM = {
  getAllFont: () => {
    const getFonts = Font.findAll();
    return getFonts;
  },

  getFont: async (_, args) => {
    await context.Font.findOne();
    console.log(args);
    const { id } = args;
    const resultData = await Font.findOne({ where: { id: id } });
    return resultData;
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
