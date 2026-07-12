//services are used to handle the business logic of the application. In this case, the s3Service.js file is responsible for handling file uploads and deletions to and from an Amazon S3 bucket.
const s3Client = require("../config/s3Client");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

// this filename make same image name to be uploaded to s3 bucket, so we need to make unique name for each image, so we can use timestamp or uuid to make unique name for each image. Here we are using timestamp to make unique name for each image.
//1783584642204-WIN_20260331_16_25_58_Pro.jpg
//1783584642204 - This is the timestamp and remaining will be same as the name of the local file
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

const getSignedFileUrl = async (fileName, expiresIn = 10) => {
  const signedUrlParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Expires: expiresIn,
  };
  return await getSignedUrl(s3Client, new GetObjectCommand(signedUrlParams), {
    expiresIn,
  });
};

module.exports = { uploadFile, deleteFile, getSignedFileUrl };
