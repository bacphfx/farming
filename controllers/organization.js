import Organization from "../models/Organization.js";
import User from "../models/User.js";

export const createOrganization = async (req, res, next) => {
  const newOrganization = new Organization(req.body);
  const userId = req.user.id;

  try {
    const savedOrganization = await newOrganization.save();
    const user = await User.findById(userId);
    const userOrg = user.organization;
    userOrg.organizationId = savedOrganization._id;

    res.status(200).json({
      status: 200,
      message: "Tạo mới mảnh đất thành công",
      data: savedOrganization,
    });
  } catch (err) {
    next(err);
  }
};
export const updateLand = async (req, res, next) => {
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
export const deleteLand = async (req, res, next) => {
  try {
    await Land.findByIdAndDelete(req.params.id);
    res.status(200).json({ stauts: 200, message: "Land has been deleted." });
  } catch (err) {
    next(err);
  }
};
export const getLand = async (req, res, next) => {
  try {
    const land = await Land.findById(req.params.id);
    res
      .status(200)
      .json({ status: 200, message: "Lấy thông tin thành công!", data: land });
  } catch (err) {
    next(err);
  }
};
export const getLands = async (req, res, next) => {
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
