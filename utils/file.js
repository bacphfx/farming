// const multer = require("multer");
// const path = require("path");

// const storageEngine = multer.diskStorage({
//   destination: "./images",
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}--${file.originalname}`);
//   },
// });

// const checkFileType = function (file, cb) {
//   //Allowed file extensions
//   const fileTypes = /jpeg|jpg|png|gif|svg|webp/;

//   //check extension names
//   const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

//   const mimeType = fileTypes.test(file.mimetype);

//   if (mimeType && extName) {
//     return cb(null, true);
//   } else {
//     cb("Error: You can Only Upload Images!!");
//   }
// };

// const upload = multer({
//   storage: storageEngine,
//   limits: { fileSize: 1000000 },
//   fileFilter: (req, file, cb) => {
//     checkFileType(file, cb);
//   },
// });
// module.exports = upload;

const fs = require("fs");

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
  });
};

exports.deleteFile = deleteFile;
