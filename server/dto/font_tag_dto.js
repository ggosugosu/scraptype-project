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
  createFontTag: async ({ font_id, tag_id }) => {
    const newFontTag = await FontTag.create({
      font_id,
      tag_id,
    });
    
    return newFontTag;
  },
};

module.exports = fontTagDTO;
