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
};

module.exports = webFontORM;
