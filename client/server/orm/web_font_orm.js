const { Font, WebFont } = require("../models/index");

const webFontORM = {
  getWebFontAll: () => {
    const getWebFonts = WebFont.findAll({
      include: [
        {
          model: Font,
          as: "font",
        },
      ],
    });
    return getWebFonts;
  },

  getWebFontByFontId: async (_, { font_id }) => {
    // TODO: null 일 때 데이터 확인 (에러 핸들링..)
    const resultData = await WebFont.findOne({ where: { font_id } });
    return resultData;
  },

  createWebFont: async ({
                          name,
                          description,
                          corporation,
                          is_web_font,
                          source,
                        }) => {
    await Font.create({ name, description, corporation, is_web_font });
    const font_id = await Font.findOne({
      where: { name, description, corporation },
    }).then((data) => data.id);

    const resultData = await WebFont.create({
      font_id: font_id,
      source,
    });

    return resultData;
  },

  updateWebFont: async ({
                          font_id,
                          name,
                          description,
                          corporation,
                          is_web_font,
                          source,
                        }) => {
    if (!(await fontExists(font_id))) return false;

    await Font.update(
      { name, description, corporation, is_web_font },
      { where: { id: font_id } }
    );

    (await webFontExists(font_id))
      ? await WebFont.update({ source }, { where: { font_id } })
      : await WebFont.create({
        font_id,
        source,
      });

    return true;
  },
};

const fontExists = async (font_id) =>
  await Font.findOne({ where: { id: font_id } })
    .then((data) => data !== null)
    .then((existsData) => existsData);

const webFontExists = async (font_id) =>
  await WebFont.findOne({ where: { font_id } })
    .then((data) => data !== null)
    .then((existsData) => existsData);

export default webFontORM;
