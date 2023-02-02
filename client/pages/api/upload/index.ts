import { IncomingForm } from 'formidable';

const mv = require('mv');

export const config = {
  api: {
    bodyParser: false,
  }
};

export default async (req, res) => {

  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm()

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      //console.log(fields, files)
      //console.log(files.file.filepath)
      console.log(files.file.filepath);
      const oldPath = files.file.filepath;
      const newPath = `./public/imageFonts/${'test'}.png`;
      mv(oldPath, newPath, function (err) {
      });
      res.status(200).json({fields, files})
    })
  })
}