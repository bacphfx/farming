const Organization = require("../models/Organization.js");
const User = require("../models/User.js");
// import fs from "fs";

exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: 200,
      message: "Cập nhật thông tin thành công!",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ status: 200, message: "Xóa người dùng thành công!" });
  } catch (err) {
    next(err);
  }
};
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res
      .status(200)
      .json({ status: 200, message: "Lấy thông tin thành công!", data: user });
  } catch (err) {
    next(err);
  }
};
exports.getUsers = async (req, res, next) => {
  try {
    console.log(req.user);
    const users = await User.find();
    res
      .status(200)
      .json({ status: 200, message: "Lấy thông tin thành công!", data: users });
  } catch (err) {
    next(err);
  }
};

exports.joinOrganization = async (req, res, next) => {
  try {
    const organization = await Organization.findOne({
      ma_to_chuc: req.body.ma_to_chuc,
    });
    await organization.addMember(req.user.id);
    const user = await User.findOne({ _id: req.user.id });
    console.log(organization);
    await user.joinOrganization(organization._id);
    res
      .status(200)
      .json({ status: 200, message: "Tham gia tổ chức thành công" });
  } catch (error) {
    next(error);
  }
};
