const { Font, ImageFont } = require('../models/index');

const imageFontORM = {
  getImageFontAll: () => {
    const getImageFonts = ImageFont.findAll({
      include: [
        {
          model: Font,
          as: 'font',
        },
      ],
    });
    return getImageFonts;
  },

  getImageFontByFontId: async (_, { font_id }) => {
    // TODO: null 일 때 데이터 확인 (에러 핸들링..)
    const resultData = await ImageFont.findOne({ where: { font_id } });
    return resultData;
  },

  createImageFont: async (_, { name, description, corporation, isWebFont, title, unit, detail_mobile, detail_pc }) => {
    const newFontData = await Font.create({ name, description, corporation, isWebFont });

    const resultData = await ImageFont.create({
      font_id: newFontData.font_id,
      title,
      unit,
      detail_mobile,
      detail_pc,
    });

    return resultData;
  },

  updateImageFont: async (_, { font_id, name, description, corporation, isWebFont, title, unit, detail_mobile, detail_pc }) => {
    if (!(await fontExists(font_id))) return false;
    await Font.update({ name, description, corporation, isWebFont }, { where: { font_id } });

    (await imageFontExists(font_id))
      ? await ImageFont.update({ font_id, title, unit, detail_mobile, detail_pc }, { where: { font_id } })
      : await ImageFont.create({
          font_id,
          title,
          unit,
          detail_mobile,
          detail_pc,
        });

    return true;
  },
};

const fontExists = async (font_id) =>
  await Font.findOne({ where: { font_id } })
    .then((data) => data !== null)
    .then((existsData) => existsData);

const imageFontExists = async (font_id) =>
  await ImageFont.findOne({ where: { font_id } })
    .then((data) => data !== null)
    .then((existsData) => existsData);

module.exports = imageFontORM;
