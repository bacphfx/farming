const Land = require("../models/Land.js");
const Tho_Nhuong = require("../models/thoNhuong.js");
const Thoi_Vu = require("../models/thoiVu.js");
const Tuoi_Tieu = require("../models/tuoiTieu.js");
const Lam_Co = require("../models/lamCo.js");
const Dinh_Duong = require("../models/dinhDuong.js");
const Phan_Bon = require("../models/phanBon.js");
const Dich_Benh = require("../models/dichBenh.js");
const Thuoc_BVTV = require("../models/thuocBVTV.js");
const Sinh_Truong = require("../models/sinhTruong.js");
const Cham_Soc = require("../models/chamSoc.js");

const createError = require("../utils/error.js");

exports.createLand = async (req, res, next) => {
  const ten = req.body.ten;
  const thon_xom = req.body.thon_xom;
  const xa_phuong = req.body.xa_phuong;
  const quan_huyen = req.body.quan_huyen;
  const tinh_tp = req.body.tinh_tp;
  const kich_thuoc = req.body.kich_thuoc;
  const toa_do = req.body.toa_do;
  const tinh_trang = req.body.tinh_trang;
  const imagePath = req.body.imagePath;
  const chi_phi = req.body.chi_phi;

  const newLand = new Land({
    ten: ten,
    thon_xom: thon_xom,
    xa_phuong: xa_phuong,
    quan_huyen: quan_huyen,
    tinh_tp: tinh_tp,
    kich_thuoc: kich_thuoc,
    toa_do: toa_do,
    tinh_trang: tinh_trang,
    imagePath: imagePath,
    chi_phi: chi_phi,
  });

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
  const image = req.file;

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
    ghi_chu: req.body.ghi_chu,
    anh_tho_nhuong: req.body.anh_tho_nhuong,
    loai_dat: req.body.loai_dat,
    dinh_duong: req.body.dinh_duong,
    nguon_nuoc: req.body.nguon_nuoc,
    anh_nguon_nuoc: req.body.anh_nguon_nuoc,
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
    anh_giong_cay: req.body.anh_giong_cay,
    thoi_gian_trong: req.body.thoi_gian_trong,
    thoi_gian_thu_hoach: req.body.thoi_gian_thu_hoach,
    anh_thuc_hien_trong_xong: req.body.anh_thuc_hien_trong_xong,
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
    anh_truoc_lam_co: req.body.anh_truoc_lam_co,
    anh_sau_lam_co: req.body.anh_sau_lam_co,
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
    anh_dinh_duong: req.body.anh_dinh_duong,
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
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
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
    anh_phan_bon: req.body.anh_phan_bon,
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
    anh_hien_tuong: req.body.anh_hien_tuong,
    anh_tac_nhan: req.body.anh_tac_nhan,
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
    anh_thuoc_BVTV: req.body.anh_thuoc_BVTV,
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

// Sinh truong cay trong
exports.getSinhTruong = async (req, res, next) => {
  try {
    const sinh_truong = await Sinh_Truong.find({ landId: req.params.id });
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: sinh_truong,
    });
  } catch (err) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    // next(err);
  }
};

exports.updateSinhTruong = async (req, res, next) => {
  try {
    const sinh_truong = await new Sinh_Truong({ landId: req.params.id });

    sinh_truong.cay_giong.anh_cay_giong = req.body.anh_cay_giong;
    sinh_truong.cay_giong.nguoi_thuc_hien = req.body.nguoi_thuc_hien_1;
    sinh_truong.cay_o_vuon_uom.anh_cay_o_vuon_uom = req.body.anh_cay_o_vuon_uom;
    sinh_truong.cay_o_vuon_uom.nguoi_thuc_hien = req.body.nguoi_thuc_hien_2;
    sinh_truong.ra_hoa.anh_ra_hoa = req.body.anh_ra_hoa;
    sinh_truong.ra_hoa.nguoi_thuc_hien = req.body.nguoi_thuc_hien_3;
    sinh_truong.dau_qua.anh_dau_qua = req.body.anh_dau_qua;
    sinh_truong.dau_qua.nguoi_thuc_hien = req.body.nguoi_thuc_hien_4;
    sinh_truong.qua_gia_chin.anh_qua_gia_chin = req.body.anh_qua_gia_chin;
    sinh_truong.qua_gia_chin.nguoi_thuc_hien = req.body.nguoi_thuc_hien_5;

    const saved = await sinh_truong.save();
    const land = await Land.findById(req.params.id);

    land.sinh_truong.push(saved.id);

    const savedLand = await land.save();

    res.status(200).json({
      status: 200,
      message: "Cập nhật thông tin thành công!",
      data: savedLand,
    });
  } catch (error) {
    // next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    next(error);
  }
};

// Ky thuat cham soc
exports.getChamSoc = async (req, res, next) => {
  try {
    const cham_soc = await Cham_Soc.find({ landId: req.params.id });
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: cham_soc,
    });
  } catch (err) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    // next(err);
  }
};

exports.updateChamSoc = async (req, res, next) => {
  try {
    const cham_soc = await new Cham_Soc({ landId: req.params.id });

    cham_soc.tia_canh.anh_tia_canh = req.body.anh_tia_canh;
    cham_soc.tia_canh.nguoi_thuc_hien = req.body.nguoi_thuc_hien_1;
    cham_soc.vun_goc.anh_vun_goc = req.body.anh_vun_goc;
    cham_soc.vun_goc.nguoi_thuc_hien = req.body.nguoi_thuc_hien_2;
    cham_soc.bao_trai.anh_bao_trai = req.body.anh_bao_trai;
    cham_soc.bao_trai.nguoi_thuc_hien = req.body.nguoi_thuc_hien_3;

    const saved = await cham_soc.save();
    const land = await Land.findById(req.params.id);

    land.cham_soc.push(saved.id);

    const savedLand = await land.save();

    res.status(200).json({
      status: 200,
      message: "Cập nhật thông tin thành công!",
      data: savedLand,
    });
  } catch (error) {
    // next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    next(error);
  }
};
