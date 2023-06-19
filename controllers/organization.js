const Organization = require("../models/Organization");
const User = require("../models/User");

exports.createOrganization = async (req, res, next) => {
  const userId = req.user.id;
  const newOrganization = new Organization(req.body);

  try {
    const savedOrganization = await newOrganization.save();
    await savedOrganization.addMember(userId);
    const user = await User.find({ _id: userId });
    console.log(user);
    await user.createOrganization(savedOrganization);

    res.status(200).json({
      status: 200,
      message: "Tạo mới mảnh đất thành công",
      data: savedOrganization,
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
