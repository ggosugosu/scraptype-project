import { IncomingForm } from 'formidable';
import { createReadStream } from 'fs';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextApiRequest, NextApiResponse } from 'next';
import * as process from "process";

export const config = {
  api: {
    bodyParser: false,
  }
};

export default async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm()

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return reject(err);
      }

      const s3Client = new S3Client({
        credentials: {
          accessKeyId: process.env.S3_AWS_ACCESS_KEY ?? '',
          secretAccessKey: process.env.S3_AWS_SECRET_KEY ?? '',
        },
        region: process.env.S3_BUCKET_REGION ?? '',
      });

      const filePath = files.file.filepath;

      const uploadCommand = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${fields['id']}_${fields['type']}.${fields['extension']}`,
        Body: createReadStream(filePath),
      });


      const response = await s3Client.send(uploadCommand);

      res.status(200).json(response);
    })
  })
}