//services are used to handle the business logic of the application. In this case, the s3Service.js file is responsible for handling file uploads and deletions to and from an Amazon S3 bucket.
const s3Client = require("../config/s3Client");
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const uploadFile = async (file, fileName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  //sends request to S3 to upload the file and returns the response
  return await s3Client.send(new PutObjectCommand(params));
};

const deleteFile = async (fileName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
  };
  return await s3Client.send(new DeleteObjectCommand(params));
};

module.exports = { uploadFile, deleteFile };
