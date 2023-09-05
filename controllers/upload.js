const User = require("../models/User.js");
const fs = require("fs");
const createError = require("../utils/error.js");

exports.uploadImage = async (req, res, next) => {
  try {
    const image = req.files;
    console.log(image);

    if (image === undefined || image.length == 0) {
      return next(createError(500, "Vui lòng chọn ảnh."));
    } else {
      const path = image[0].path;
      const imagePath = path.replace("\\", "/");
      res.status(200).json({
        status: 200,
        message: "Tải ảnh lên thành công!",
        data: [imagePath],
      });
    }
  } catch (error) {
    next(error);
  }
  // var realFile = Buffer.from(req.files, "base64");
  // fs.writeFileSync("test", realFile, "utf-8");
  // console.log(req.files);
  // console.log(realFile);
  // await res.send({ message: "OK" });
};

exports.uploadImages = async (req, res, next) => {
  try {
    const image = req.files;
    console.log(image);
    if (image.length == 0) {
      return next(createError(500, "Vui lòng chọn ảnh."));
    }
    const imagePath = image.map((i) => i.path.replace("\\", "/"));

    res.status(200).json({
      status: 200,
      message: "Tải ảnh lên thành công!",
      data: imagePath,
    });
  } catch (error) {
    next(error);
  }
};
