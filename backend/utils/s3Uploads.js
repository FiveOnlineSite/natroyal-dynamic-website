// utils/uploadToS3.js
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadToS3 = async (file, folderPrefix = "public/banners") => {
  const fileContent = fs.readFileSync(file.path);

  const filename = `${Date.now()}_${path.basename(file.originalname)}`;
  const key = `${folderPrefix}/${filename}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: fileContent,
    ContentType: file.mimetype,
    ACL: "public-read", 
  };

  await s3Client.send(new PutObjectCommand(params));

  fs.unlinkSync(file.path);

  return {
    filename,
    filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
  };
};

module.exports = { uploadToS3 };
