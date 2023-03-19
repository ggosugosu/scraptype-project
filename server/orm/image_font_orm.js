const { Font, ImageFont } = require('../models');

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

  createImageFont: async ({
                            name,
                            description,
                            corporation,
                            is_web_font,
                            title,
                            unit,
                            detail_mobile,
                            detail_pc,
                          }) => {
    await Font.create({ name, description, corporation, is_web_font });
    const font_id = await Font.findOne({
      where: { name, description, corporation },
    }).then((data) => data.id);

    const resultData = await ImageFont.create({
      font_id: font_id,
      title,
      unit,
      detail_mobile,
      detail_pc,
    });

    return resultData;
  },

  updateImageFont: async ({
                            font_id,
                            name,
                            description,
                            corporation,
                            is_web_font,
                            title,
                            unit,
                            detail_mobile,
                            detail_pc,
                          }) => {
    if (!(await fontExists(font_id))) return false;
    await Font.update(
      { name, description, corporation, is_web_font },
      { where: { id: font_id } }
    );

    (await imageFontExists(font_id))
      ? await ImageFont.update(
        { font_id, title, unit, detail_mobile, detail_pc },
        { where: { font_id } }
      )
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
  await Font.findOne({ where: { id: font_id } })
    .then((data) => data !== null)
    .then((existsData) => existsData);

const imageFontExists = async (font_id) =>
  await ImageFont.findOne({ where: { font_id } })
    .then((data) => data !== null)
    .then((existsData) => existsData);

export default imageFontORM;
