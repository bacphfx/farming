const Banner = require("../models/Banner");

exports.createBanner = async (req, res, next) => {
  const newBanner = new Banner(req.body);

  try {
    const savedBanner = await newBanner.save();

    res.status(200).json({
      status: 200,
      message: "Tạo mới banner thành công",
      data: savedBanner,
    });
  } catch (err) {
    next(err);
  }
};
exports.updateBanner = async (req, res, next) => {
  try {
    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: 200,
      message: "Cập nhật thông tin thành công",
      data: updatedBanner,
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteBanner = async (req, res, next) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ status: 200, message: "Organization has been deleted." });
  } catch (err) {
    next(err);
  }
};
exports.getBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: banner,
    });
  } catch (err) {
    next(err);
  }
};

exports.getBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find();
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: banners,
    });
  } catch (err) {
    next(err);
  }
};
