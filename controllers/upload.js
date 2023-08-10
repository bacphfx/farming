const User = require("../models/User.js");
const fs = require("fs");
const createError = require("../utils/error.js");

exports.uploadAvatar = async (req, res, next) => {
  try {
    const image = req.file;
    if (!image) {
      return next(createError(500, "Vui lòng chọn 1 ảnh."));
    }
    const imagePath = image.path;
    const user = await User.findById(req.user.id);
    // if (user.image_path) {
    //   fs.unlinkSync(user.image_path, (err) => {
    //     if (err) next(err);
    //   });
    // }
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: req.body, image_path: imagePath },
      { new: true }
    );
    res.status(200).json({
      status: 200,
      message: "Tải ảnh đại diện thành công!",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.uploadImages = (req, res, next) => {};
