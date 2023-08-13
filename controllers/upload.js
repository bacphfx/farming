const User = require("../models/User.js");
const fs = require("fs");
const createError = require("../utils/error.js");

exports.uploadImage = async (req, res, next) => {
  try {
    const image = req.files;
    if (!image) {
      return next(createError(500, "Vui lòng chọn ảnh."));
    }
    const imagePath = image[0].path;
    // const user = await User.findById(req.user.id);
    // const updatedUser = await User.findByIdAndUpdate(
    //   req.user.id,
    //   { $set: req.body, image_path: imagePath },
    //   { new: true }
    // );
    res.status(200).json({
      status: 200,
      message: "Tải ảnh lên thành công!",
      data: imagePath,
    });
  } catch (error) {
    next(error);
  }
};

exports.uploadImages = async (req, res, next) => {
  try {
    const image = req.files;
    if (!image) {
      return next(createError(500, "Vui lòng chọn ảnh."));
    }
    const imagePath = image.map((i) => i.path);

    res.status(200).json({
      status: 200,
      message: "Tải ảnh lên thành công!",
      data: imagePath,
    });
  } catch (error) {
    next(error);
  }
};
