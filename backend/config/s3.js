const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Example upload
const uploadFile = async (file) => {
  const upload = new Upload({
    client: s3Client, // must be v3 S3Client, not v2 AWS.S3()
    params: {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
    },
  });

  upload.on("httpUploadProgress", (progress) => {
    console.log(progress);
  });

  await upload.done();
};
