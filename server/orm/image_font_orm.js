const { Font, ImageFont } = require("../models/index");

const imageFontORM = {
  getImageFontByFontId: () => {
    const getImageFont = ImageFont.findAll({
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

module.exports = imageFontORM;
