const { ApolloError } = require("apollo-server-micro");
const { FontTag, Font } = require("../models/index");

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
    if (!isUnique(font_id, tag_id)) throw new ApolloError("Data already exists.", "BAD_INPUT", {status: 400, error: true});
    
    const newFontTag = await FontTag.create({
      font_id,
      tag_id,
    });

    return newFontTag;
  },
};

const isUnique = (font_id, tag_id) => FontTag.findOne({where: {font_id: font_id, tag_id: tag_id}}) === null;

module.exports = fontTagDTO;
