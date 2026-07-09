const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const upload = require("../middleware/multer");//used multer

router.post("/", upload.single("file"), uploadController.upload); //to add one file at a time, use upload.single("file") where "file" is the name of the field in the form that contains the file to be uploaded.

module.exports = router;
