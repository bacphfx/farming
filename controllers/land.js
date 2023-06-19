const Land = require("../models/Land.js");

exports.createLand = async (req, res, next) => {
  const newLand = new Land(req.body);

  try {
    const savedLand = await newLand.save();
    res.status(200).json({
      status: 200,
      message: "Tạo mới mảnh đất thành công",
      data: savedLand,
    });
  } catch (err) {
    next(err);
  }
};
exports.updateLand = async (req, res, next) => {
  try {
    const updatedLand = await Land.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: 200,
      message: "Cập nhật thông tin thành công",
      data: updatedLand,
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteLand = async (req, res, next) => {
  try {
    await Land.findByIdAndDelete(req.params.id);
    res.status(200).json({ stauts: 200, message: "Land has been deleted." });
  } catch (err) {
    next(err);
  }
};
exports.getLand = async (req, res, next) => {
  try {
    const land = await Land.findById(req.params.id);
    res
      .status(200)
      .json({ status: 200, message: "Lấy thông tin thành công!", data: land });
  } catch (err) {
    next(err);
  }
};
exports.getLands = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const lands = await Land.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res
      .status(200)
      .json({ status: 200, message: "Lấy thông tin thành công!", data: lands });
  } catch (err) {
    next(err);
  }
};
