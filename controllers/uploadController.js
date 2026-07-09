const { uploadFile } = require("../services/s3Service");
const FileModel = require("../models/file"); 

exports.upload = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const key = `${Date.now()}-${file.originalname}`; // Generate a unique key for the file

    await uploadFile(file, key);
    const fileUrl = `${process.env.AWS_BUCKET_NAME}/${key}`;
    const saveFile = await FileModel.create({ key, fileUrl });
    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error uploading file:", error);
    console.log(error);
    res.status(500).json({ error: "Failed to upload file", error });
  }
};
