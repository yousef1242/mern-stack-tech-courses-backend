const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".mkv" &&
      ext !== ".jpeg" &&
      ext !== ".jpg" &&
      ext !== ".png" &&
      ext !== ".mp4" &&
      ext !== ".webp"
    ) {
      const error = new Error("File type is not supported");
      error.status = 400;
      cb(error, false);
      return;
    }
    cb(null, true);
  },
});