const Organization = require("../models/Organization");
const User = require("../models/User");

exports.createOrganization = async (req, res, next) => {
  const userId = req.user.id;
  console.log(userId);
  const newOrganization = new Organization(req.body);

  try {
    const savedOrganization = await newOrganization.save();
    await savedOrganization.addMember(userId);
    const user = await User.findOne({ _id: userId });
    console.log(user);
    await user.createOrganization(savedOrganization);

    res.status(200).json({
      status: 200,
      message: "Tạo mới tổ chức thành công",
      data: savedOrganization,
    });
  } catch (err) {
    next(err);
  }
};
exports.updateOrganization = async (req, res, next) => {
  try {
    const updatedOrg = await Organization.findByIdAndUpdate(
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
exports.deleteOrganization = async (req, res, next) => {
  try {
    await Land.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ stauts: 200, message: "Organization has been deleted." });
  } catch (err) {
    next(err);
  }
};
exports.getOrganization = async (req, res, next) => {
  try {
    const org = await Organization.findById(req.params.id);
    res
      .status(200)
      .json({ status: 200, message: "Lấy thông tin thành công!", data: org });
  } catch (err) {
    next(err);
  }
};
exports.getOrgs = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const orgs = await Organization.find();
    res
      .status(200)
      .json({ status: 200, message: "Lấy thông tin thành công!", data: orgs });
  } catch (err) {
    next(err);
  }
};
