import User from "../models/User.js";
import fs from "fs";

export const updateUser = async (req, res, next) => {
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
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ status: 200, message: "Xóa người dùng thành công!" });
  } catch (err) {
    next(err);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res
      .status(200)
      .json({ status: 200, message: "Lấy thông tin thành công!", data: user });
  } catch (err) {
    next(err);
  }
};
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .json({ status: 200, message: "Lấy thông tin thành công!", data: users });
  } catch (err) {
    next(err);
  }
};
