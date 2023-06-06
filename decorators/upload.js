// const multer = require("multer");
// const path = require("path");

// const { HttpError } = require("../helpers");

// const destination = path.resolve("temp");

// const storage = multer.diskStorage({
//   destination,
//   filename: (req, file, cb) => {
//     const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const newName = `${uniquePrefix}_${file.filename}`;
//     cb(null, newName);
//   },
// });

// const limits = {
//   fileSize: 1024 * 1024,
// };

// const fileFilter = (req, file, cb) => {
//   const { mimetype } = file;
//   if (mimetype !== "image/jpeg" || mimetype !== "image/png") {
//     cb(HttpError(400, "File can have only .png and .jpg extension"), false);
//   }
//   cb(null, true);
// };

// const upload = multer({
//   storage,
//   limits,
//   fileFilter,
// });

// module.expots = {
//   upload,
// };



const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "..", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = {
  upload,
};
