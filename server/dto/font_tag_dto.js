const { FontTag } = require("../models/index");

FontTag.sequelize
  .sync()
  .then(() => {
    console.log("sequelize success");
  })
  .catch((err) => {
    console.log("sequelize fail", err);
  });

const fontTagDTO = {
  createFontTag: async (_, { font_id, tag_id }) => {
    const newFont = await FontTag.create({
      font_id,
      tag_id,
    });

    const font = await Font.findOne({ where: { id: id } });

    return font;
  },
};

module.exports = fontTagDTO;
