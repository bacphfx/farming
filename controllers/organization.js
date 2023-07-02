const Organization = require("../models/Organization");
const User = require("../models/User");

exports.createOrganization = async (req, res, next) => {
  const randomString = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result.toUpperCase();
  };
  const userId = req.user.id;
  const newOrganization = new Organization({
    ten_to_chuc: req.body.ten_to_chuc,
    telephone: req.body.telephone,
    email: req.body.email,
    ma_to_chuc: randomString(8),
    thon_xom: req.body.thon_xom,
    xa_phuong: req.body.xa_phuong,
    quan_huyen: req.body.quan_huyen,
    tinh_tp: req.body.tinh_tp,
    dai_dien: req.body.dai_dien,
  });

  try {
    const savedOrganization = await newOrganization.save();
    await savedOrganization.addMember(userId);
    const user = await User.findOne({ _id: userId });
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
      data: updatedOrg,
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
    const memberData = await Promise.all(
      org.members.map((memberId) => {
        return User.findById(memberId);
      })
    );
    const memberList = memberData.map((member) => {
      return {
        id: member.id,
        fullname: member.fullname,
        isFounder: member.organization.filter(
          (o) => o.organizationId === org.id
        )[0].isFounder,
      };
    });
    const { members, ...other } = org._doc;
    other.members = memberList;
    res
      .status(200)
      .json({ status: 200, message: "Lấy thông tin thành công!", data: other });
  } catch (err) {
    next(err);
  }
};
exports.getOrgs = async (req, res, next) => {
  try {
    const orgs = await Organization.find();
    res
      .status(200)
      .json({ status: 200, message: "Lấy thông tin thành công!", data: orgs });
  } catch (err) {
    next(err);
  }
};

exports.findOrg = async (req, res, next) => {
  try {
    const org = await Organization.findOne({ ma_to_chuc: req.body.ma_to_chuc });
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: org.ten_to_chuc.toUpperCase(),
    });
  } catch (error) {
    next(error);
  }
};
