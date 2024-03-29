const Land = require("../models/Land.js");
const Tho_Nhuong = require("../models/thoNhuong.js");
const Thoi_Vu = require("../models/thoiVu.js");
const Tuoi_Tieu = require("../models/tuoiTieu.js");
const Lam_Co = require("../models/lamCo.js");
const Dinh_Duong = require("../models/dinhDuong.js");
const Phan_Bon = require("../models/phanBon.js");
const Dich_Benh = require("../models/dichBenh.js");
const Thuoc_BVTV = require("../models/thuocBVTV.js");

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
    const {
      tho_nhuong,
      thoi_vu,
      tuoi_tieu,
      lam_co,
      dinh_duong,
      phan_bon,
      dich_benh,
      thuoc_BVTV,
      ...otherDetails
    } = land._doc;
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

// Tho nhuong
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

// Thoi vu
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

// Tuoi tieu
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

// Lam co
exports.getLamCo = async (req, res, next) => {
  try {
    const lam_co = await Lam_Co.find({ landId: req.params.id });
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: lam_co,
    });
  } catch (err) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    // next(err);
  }
};

exports.updateLamCo = async (req, res, next) => {
  const lam_co = new Lam_Co({
    nguoi_thuc_hien: req.body.nguoi_thuc_hien,
    phuong_phap: req.body.phuong_phap,
    thoi_gian: req.body.thoi_gian,
    landId: req.params.id,
  });
  try {
    const saved = await lam_co.save();
    const land = await Land.findById(req.params.id);

    land.lam_co.push(saved.id);

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

// Dinh duong
exports.getDinhDuong = async (req, res, next) => {
  try {
    const dinh_duong = await Dinh_Duong.find({ landId: req.params.id });
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: dinh_duong,
    });
  } catch (err) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    // next(err);
  }
};

exports.updateDinhDuong = async (req, res, next) => {
  const dinh_duong = new Dinh_Duong({
    nguoi_cap_nhat: req.body.nguoi_cap_nhat,
    hien_tuong: req.body.hien_tuong,
    ket_qua_do: req.body.ket_qua_do,
    thoi_gian: req.body.thoi_gian,
    landId: req.params.id,
  });
  try {
    const saved = await dinh_duong.save();
    const land = await Land.findById(req.params.id);

    land.dinh_duong.push(saved.id);

    const savedLand = await land.save();

    res.status(200).json({
      status: 200,
      message: "Cập nhật thông tin thành công!",
      data: savedLand,
      
    });
  } catch (error) {
    // next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    next(error)
  }
};

// Phan bon
exports.getPhanBon = async (req, res, next) => {
  try {
    const phan_bon = await Phan_Bon.find({ landId: req.params.id });
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: phan_bon,
    });
  } catch (err) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    // next(err);
  }
};

exports.updatePhanBon = async (req, res, next) => {
  const phan_bon = new Phan_Bon({
    nguoi_thuc_hien: req.body.nguoi_thuc_hien,
    ten_phan_bon: req.body.ten_phan_bon,
    loai_phan_bon: req.body.loai_phan_bon,
    cach_thuc_bon: req.body.cach_thuc_bon,
    luong_su_dung: req.body.luong_su_dung,
    thoi_gian: req.body.thoi_gian,
    landId: req.params.id,
  });
  try {
    const saved = await phan_bon.save();
    const land = await Land.findById(req.params.id);

    land.phan_bon.push(saved.id);

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

// Dich benh hai
exports.getDichBenh = async (req, res, next) => {
  try {
    const dich_benh = await Dich_Benh.find({ landId: req.params.id });
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: dich_benh,
    });
  } catch (err) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    // next(err);
  }
};

exports.updateDichBenh = async (req, res, next) => {
  const dich_benh = new Dich_Benh({
    nguoi_thuc_hien: req.body.nguoi_thuc_hien,
    hien_tuong: req.body.hien_tuong,
    tac_nhan: req.body.tac_nhan,
    thoi_gian: req.body.thoi_gian,
    landId: req.params.id,
  });
  try {
    const saved = await dich_benh.save();
    const land = await Land.findById(req.params.id);

    land.dich_benh.push(saved.id);

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

// Thuoc bao ve thuc vat
exports.getThuocBVTV = async (req, res, next) => {
  try {
    const thuoc_BVTV = await Thuoc_BVTV.find({ landId: req.params.id });
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: thuoc_BVTV,
    });
  } catch (err) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    // next(err);
  }
};

exports.updateThuocBVTV = async (req, res, next) => {
  const thuoc_BVTV = new Thuoc_BVTV({
    ten_thuoc: req.body.ten_thuoc,
    so_luong: req.body.so_luong,
    thoi_gian: req.body.thoi_gian,
    landId: req.params.id,
  });
  try {
    const saved = await thuoc_BVTV.save();
    const land = await Land.findById(req.params.id);

    land.thuoc_BVTV.push(saved.id);

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
