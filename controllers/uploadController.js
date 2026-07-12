const { uploadFile } = require("../services/s3Service");
const FileModel = require("../models/file");
const { getSignedFileUrl } = require("../services/s3Service");

exports.upload = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const key = `${Date.now()}-${file.originalname}`; // Generate a unique key for the file

    await uploadFile(file, key);
    // const fileUrl = `${process.env.AWS_BUCKET_URl}/${key}`;
    // const saveFile = await FileModel.create({ key, fileUrl });
    // Instead of doing the above do the below
    const saveFile = await FileModel.create({ key });
    const fileUrl = await getSignedFileUrl(key, 20); // Generate a signed URL for the uploaded file, valid for 1 hour (3600 seconds)
    res
      .status(200)
      .json({ message: "File uploaded successfully", key, fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    console.log(error);
    res.status(500).json({ error: "Failed to upload file", error });
  }
};
