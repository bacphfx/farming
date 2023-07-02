const Land = require("../models/Land.js");
const Tho_Nhuong = require("../models/thoNhuong.js");
const Thoi_Vu = require("../models/thoiVu.js");
const Tuoi_Tieu = require("../models/tuoiTieu.js");
const createError = require("../utils/error.js");

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
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
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
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
  }
};
exports.deleteLand = async (req, res, next) => {
  try {
    await Land.findByIdAndDelete(req.params.id);
    res.status(200).json({ stauts: 200, message: "Land has been deleted." });
  } catch (err) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
  }
};
exports.getLand = async (req, res, next) => {
  try {
    const land = await Land.findById(req.params.id);
    const { tho_nhuong, thoi_vu, tuoi_tieu, ...otherDetails } = land._doc;
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: otherDetails,
    });
  } catch (err) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
  }
};

exports.getLands = async (req, res, next) => {
  try {
    const lands = await Land.find();

    res
      .status(200)
      .json({ status: 200, message: "Lấy thông tin thành công!", data: lands });
  } catch (err) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
  }
};

// exports.getLand = async (req, res, next) => {
//   try {
//     const land = await Land.findOne(req.param.landId);
//     const list_tho_nhuong = await Promise.all(
//       land.tho_nhuong.map((tho_nhuong_id) => {
//         return Tho_Nhuong.findById(tho_nhuong_id);
//       })
//     );
//     const list_thoi_vu = await Promise.all(
//       land.thoi_vu.map((thoi_vu_id) => {
//         return Thoi_Vu.findById(thoi_vu_id);
//       })
//     );
//     const list_tuoi_tieu = await Promise.all(
//       land.tuoi_tieu.map((tuoi_tieu_id) => {
//         return Tuoi_Tieu.findById(tuoi_tieu_id);
//       })
//     );
//     const data = {
//       land: land,
//       tho_nhuong: list_tho_nhuong,
//       thoi_vu: list_thoi_vu,
//       tuoi_tieu: list_tuoi_tieu,
//     };
//     res.status(200).json(data);
//   } catch (err) {
//     next(err);
//   }
// };

exports.getThoNhuong = async (req, res, next) => {
  try {
    const tho_nhuong = await Tho_Nhuong.find({ landId: req.params.id });
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: tho_nhuong,
    });
  } catch (err) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
  }
};

exports.updateThoNhuong = async (req, res, next) => {
  const tho_nhuong = new Tho_Nhuong({
    ngay_cap_nhat: req.body.ngay_cap_nhat,
    loai_dat: req.body.loai_dat,
    dinh_duong: req.body.dinh_duong,
    nguon_nuoc: req.body.nguon_nuoc,
    landId: req.params.id,
  });
  try {
    const saved = await tho_nhuong.save();
    const land = await Land.findById(req.params.id);

    land.tho_nhuong.push(saved.id);

    const savedLand = await land.save();

    res.status(200).json({
      status: 200,
      message: "Cập nhật thông tin thành công!",
      data: savedLand,
    });
  } catch (error) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
  }
};

exports.getThoiVu = async (req, res, next) => {
  try {
    const thoi_vu = await Thoi_Vu.find({ landId: req.params.id });
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: thoi_vu,
    });
  } catch (err) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
  }
};

exports.updateThoiVu = async (req, res, next) => {
  const thoi_vu = new Thoi_Vu({
    nguoi_trong: req.body.nguoi_trong,
    trang_thai: req.body.trang_thai,
    cay_trong: req.body.cay_trong,
    giong_cay: req.body.giong_cay,
    start: req.body.start,
    end: req.body.end,
    landId: req.params.id,
  });
  try {
    const saved = await thoi_vu.save();
    const land = await Land.findById(req.params.id);

    land.thoi_vu.push(saved.id);

    const savedLand = await land.save();

    res.status(200).json({
      status: 200,
      message: "Cập nhật thông tin thành công!",
      data: savedLand,
    });
  } catch (error) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
  }
};

exports.getTuoiTieu = async (req, res, next) => {
  try {
    const tuoi_tieu = await Tuoi_Tieu.find({ landId: req.params.id });
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: tuoi_tieu,
    });
  } catch (err) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    // next(err);
  }
};

exports.updateTuoiTieu = async (req, res, next) => {
  const tuoi_tieu = new Tuoi_Tieu({
    nguoi_tuoi: req.body.nguoi_tuoi,
    phuong_phap: req.body.phuong_phap,
    cong_suat: req.body.cong_suat,
    thoi_luong: req.body.thoi_luong,
    thoi_gian: req.body.thoi_gian,
    landId: req.params.id,
  });
  try {
    const saved = await tuoi_tieu.save();
    const land = await Land.findById(req.params.id);

    land.tuoi_tieu.push(saved.id);

    const savedLand = await land.save();

    res.status(200).json({
      status: 200,
      message: "Cập nhật thông tin thành công!",
      data: savedLand,
    });
  } catch (error) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
  }
};
