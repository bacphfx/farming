const Land = require("../models/Land.js");
const User = require("../models/User.js");
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
const Thu_Hoach = require("../models/thuHoach.js");
const Mua_Cay_Giong = require("../models/muaCayGiong.js");
const Mua_Phan_Bon = require("../models/muaPhanBon.js");
const Mua_Thuoc_BVTV = require("../models/muaThuocBVTV.js");
const Mua_Thuoc_Diet_Co = require("../models/muaThuocDietCo.js");
const Thoi_Tiet = require("../models/thoiTiet.js");

const createError = require("../utils/error.js");
const Organization = require("../models/Organization.js");

function strToArr(str) {
  if (str == "[]") return null;
  const newStr = str
    .replace("[", "")
    .replace("]", "")
    .replace(/(\r\n|\n|\r)/gm, "")
    .replace(/\s/g, "");
  if (newStr.includes(",")) {
    return newStr.split(",");
  }
  return [newStr];
}

exports.createLand = async (req, res, next) => {
  try {
    const ten = req.body.ten;
    const thon_xom = req.body.thon_xom;
    const xa_phuong = req.body.xa_phuong;
    const quan_huyen = req.body.quan_huyen;
    const tinh_tp = req.body.tinh_tp;
    const kich_thuoc = req.body.kich_thuoc;
    const toa_do = req.body.toa_do;
    const tinh_trang = req.body.tinh_trang;
    const imagePath = req.body.imagePath ? strToArr(req.body.imagePath) : null;
    const chi_phi = req.body.chi_phi;
    const orgId = req.body.orgId;

    const newLand = await new Land({
      orgId: orgId,
      userId: req.user.id,
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
    const savedLand = await newLand.save();

    const org = await Organization.findById(orgId);
    const user = await User.findById(req.user.id);
    const isFounder = user.organization.filter(
      (o) => o.organizationId === org.id
    )[0].isFounder;
    if (!isFounder) {
      return next(
        createError(400, "Ban khong co quyen tao manh dat cho to chuc nay")
      );
    }
    await org.addLand(savedLand.id);
    res.status(200).json({
      status: 200,
      message: "Tạo mới mảnh đất thành công",
      data: savedLand,
    });
  } catch (err) {
    // next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    next(err);
  }
};
exports.updateLand = async (req, res, next) => {
  const image = req.file;

  try {
    const updatedLand = await Land.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
        imagePath: req.body.imagePath ? strToArr(req.body.imagePath) : null,
      },
      { new: true }
    );
    res.status(200).json({
      status: 200,
      message: "Cập nhật thông tin thành công",
      data: updatedLand,
    });
  } catch (err) {
    // next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    next(err);
  }
};
exports.deleteLand = async (req, res, next) => {
  try {
    await Land.findByIdAndDelete(req.params.id);
    const org = await Organization.findById(orgId);
    const indexOfLand = org.indexOf(req.params.id);
    if (indexOfLand > -1) {
      org.land.splice(index, 1);
    }
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
      sinh_truong,
      cham_soc,
      ...otherDetails
    } = land._doc;
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: otherDetails,
    });
  } catch (err) {
    // next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    next(err);
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
    nguoi_thuc_hien_1: req.body.nguoi_thuc_hien_1,
    thoi_gian_1: req.body.thoi_gian_1,
    loai_dat: req.body.loai_dat,
    asen_1: req.body.asen_1,
    cadimi_1: req.body.cadimi_1,
    chi_1: req.body.chi_1,
    crom_1: req.body.crom_1,
    dong_1: req.body.dong_1,
    kem_1: req.body.kem_1,
    ph_1: req.body.ph_1,
    nguoi_thuc_hien_2: req.body.nguoi_thuc_hien_2,
    thoi_gian_2: req.body.thoi_gian_2,
    ph_2: req.body.ph_2,
    oxy: req.body.oxy,
    chat_ran: req.body.chat_ran,
    sar: req.body.sar,
    clorua: req.body.clorua,
    so4: req.body.so4,
    bo: req.body.bo,
    asen_2: req.body.asen_2,
    cadimi_2: req.body.cadimi_2,
    chi_2: req.body.chi_2,
    crom_2: req.body.crom_2,
    dong_2: req.body.dong_2,
    kem_2: req.body.kem_2,
    coli: req.body.coli,
    landId: req.params.id,
  });
  try {
    tho_nhuong.image_path_1 = req.body.image_path_1
      ? strToArr(req.body.image_path_1)
      : null;
    tho_nhuong.image_path_2 = req.body.image_path_2
      ? strToArr(req.body.image_path_2)
      : null;
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
    // next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    next(error);
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
    thoi_gian_trong: req.body.thoi_gian_trong,
    thoi_gian_thu_hoach: req.body.thoi_gian_thu_hoach,
    landId: req.params.id,
  });
  try {
    thoi_vu.anh_giong_cay = req.body.anh_giong_cay
      ? strToArr(req.body.anh_giong_cay)
      : null;
    thoi_vu.anh_sau_khi_gieo_trong = req.body.anh_sau_khi_gieo_trong
      ? strToArr(req.body.anh_sau_khi_gieo_trong)
      : null;
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
    // next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    next(error);
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
    // next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    next(error);
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
    ten_thuoc: req.body.ten_thuoc,
    lieu_dung_thuoc: req.body.lieu_dung_thuoc,
    thoi_gian: req.body.thoi_gian,
    landId: req.params.id,
  });
  try {
    lam_co.anh_truoc_lam_co = req.body.anh_truoc_lam_co
      ? strToArr(req.body.anh_truoc_lam_co)
      : null;
    lam_co.anh_sau_lam_co = req.body.anh_sau_lam_co
      ? strToArr(req.body.anh_sau_lam_co)
      : null;
    lam_co.hinh_anh_thuoc = req.body.hinh_anh_thuoc
      ? strToArr(req.body.hinh_anh_thuoc)
      : null;
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
    // next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    next(error);
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
    dinh_duong.anh_dinh_duong = req.body.anh_dinh_duong
      ? strToArr(req.body.anh_dinh_duong)
      : null;
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
    so_luong: req.body.so_luong,
    luong_su_dung: req.body.luong_su_dung,
    thanh_tien: req.body.thanh_tien,
    thoi_gian: req.body.thoi_gian,
    ten_dai_ly: req.body.ten_dai_ly,
    ten_nguoi_ban: req.body.ten_nguoi_ban,
    dia_chi: req.body.dia_chi,
    so_dien_thoai: req.body.so_dien_thoai,
    landId: req.params.id,
  });
  try {
    phan_bon.anh_phan_bon = req.body.anh_phan_bon
      ? strToArr(req.body.anh_phan_bon)
      : null;
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
    next(error);
    // next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
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
    dich_benh.anh_hien_tuong = req.body.anh_hien_tuong
      ? strToArr(req.body.anh_hien_tuong)
      : null;
    dich_benh.anh_tac_nhan = req.body.anh_tac_nhan
      ? strToArr(req.body.anh_tac_nhan)
      : null;
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
    lieu_luong: req.body.lieu_luong,
    so_luong: req.body.so_luong,
    chi_phi: req.body.chi_phi,
    phuong_phap: req.body.phuong_phap,
    nguoi_thuc_hien: req.body.ten_thuoc,
    thoi_gian: req.body.thoi_gian,
    ten_dai_ly: req.body.ten_dai_ly,
    ten_nguoi_ban: req.body.ten_nguoi_ban,
    dia_chi: req.body.dia_chi,
    dien_thoai: req.body.dien_thoai,

    landId: req.params.id,
  });
  try {
    thuoc_BVTV.anh_thuoc_BVTV = req.body.anh_thuoc_BVTV
      ? strToArr(req.body.anh_thuoc_BVTV)
      : null;
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

    sinh_truong.cay_giong.anh_cay_giong = req.body.anh_cay_giong
      ? strToArr(req.body.anh_cay_giong)
      : null;
    sinh_truong.cay_giong.nguoi_thuc_hien = req.body.nguoi_thuc_hien_1;
    sinh_truong.cay_giong.thoi_gian = req.body.thoi_gian_1;
    sinh_truong.cay_o_vuon_uom.anh_cay_o_vuon_uom = req.body.anh_cay_o_vuon_uom
      ? strToArr(req.body.anh_cay_o_vuon_uom)
      : null;
    sinh_truong.cay_o_vuon_uom.nguoi_thuc_hien = req.body.nguoi_thuc_hien_2;
    sinh_truong.cay_o_vuon_uom.thoi_gian = req.body.thoi_gian_2;
    sinh_truong.ra_hoa.anh_ra_hoa = req.body.anh_ra_hoa
      ? strToArr(req.body.anh_ra_hoa)
      : null;
    sinh_truong.ra_hoa.nguoi_thuc_hien = req.body.nguoi_thuc_hien_3;
    sinh_truong.ra_hoa.thoi_gian = req.body.thoi_gian_3;
    sinh_truong.dau_qua.anh_dau_qua = req.body.anh_dau_qua
      ? strToArr(req.body.anh_dau_qua)
      : null;
    sinh_truong.dau_qua.nguoi_thuc_hien = req.body.nguoi_thuc_hien_4;
    sinh_truong.dau_qua.thoi_gian = req.body.thoi_gian_4;
    sinh_truong.qua_gia_chin.anh_qua_gia_chin = req.body.anh_qua_gia_chin
      ? strToArr(req.body.anh_qua_gia_chin)
      : null;
    sinh_truong.qua_gia_chin.nguoi_thuc_hien = req.body.nguoi_thuc_hien_5;
    sinh_truong.qua_gia_chin.thoi_gian = req.body.thoi_gian_5;

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

    cham_soc.tia_canh.anh_tia_canh = req.body.anh_tia_canh
      ? strToArr(req.body.anh_tia_canh)
      : null;
    cham_soc.tia_canh.nguoi_thuc_hien = req.body.nguoi_thuc_hien_1;
    cham_soc.tia_canh.thoi_gian = req.body.thoi_gian_1;
    cham_soc.vun_goc.anh_vun_goc = req.body.anh_vun_goc
      ? strToArr(req.body.anh_vun_goc)
      : null;
    cham_soc.vun_goc.nguoi_thuc_hien = req.body.nguoi_thuc_hien_2;
    cham_soc.vun_goc.thoi_gian = req.body.thoi_gian_2;
    cham_soc.bao_trai.anh_bao_trai = req.body.anh_bao_trai
      ? strToArr(req.body.anh_bao_trai)
      : null;
    cham_soc.bao_trai.nguoi_thuc_hien = req.body.nguoi_thuc_hien_3;
    cham_soc.bao_trai.thoi_gian = req.body.thoi_gian_3;

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

// Thu hoach
exports.getThuHoach = async (req, res, next) => {
  try {
    const thu_hoach = await Thu_Hoach.find({ landId: req.params.id });
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: thu_hoach,
    });
  } catch (err) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    // next(err);
  }
};

exports.updateThuHoach = async (req, res, next) => {
  try {
    const thu_hoach = await new Thu_Hoach({
      landId: req.params.id,
      nguoi_thuc_hien: req.body.nguoi_thuc_hien,
      thoi_gian_cap_nhat: req.body.thoi_gian_cap_nhat,
      san_luong: req.body.san_luong,
      gia_ban: req.body.gia_ban,
      thanh_tien: req.body.thanh_tien,
      dien_tich: req.body.dien_tich,
    });

    const saved = await thu_hoach.save();
    const land = await Land.findById(req.params.id);

    land.thu_hoach.push(saved.id);

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

// mua cay giong

exports.getMuaCayGiong = async (req, res, next) => {
  try {
    const mua_cay_giong = await Mua_Cay_Giong.find({ landId: req.params.id });
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: mua_cay_giong,
    });
  } catch (err) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    // next(err);
  }
};

exports.updateMuaCayGiong = async (req, res, next) => {
  try {
    const mua_cay_giong = await new Mua_Cay_Giong({
      landId: req.params.id,
      ten_hat_giong: req.body.ten_hat_giong,
      so_luong: req.body.so_luong,
      nguoi_mua: req.body.nguoi_mua,
      ten_co_so: req.body.ten_co_so,
      dien_thoai: req.body.dien_thoai,
      email: req.body.email,
      thon_xom: req.body.thon_xom,
      xa_phuong: req.body.xa_phuong,
      quan_huyen: req.body.quan_huyen,
      tinh_tp: req.body.tinh_tp,
      quoc_gia: req.body.quoc_gia,
    });
    mua_cay_giong.anh_cay_giong = req.body.anh_cay_giong
      ? strToArr(req.body.anh_cay_giong)
      : null;
    mua_cay_giong.anh_hoa_don = req.body.anh_hoa_don
      ? strToArr(req.body.anh_hoa_don)
      : null;
    const saved = await mua_cay_giong.save();
    const land = await Land.findById(req.params.id);

    land.mua_cay_giong.push(saved.id);

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

// mua phan bon
exports.getMuaPhanBon = async (req, res, next) => {
  try {
    const mua_phan_bon = await Mua_Phan_Bon.find({ landId: req.params.id });
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: mua_phan_bon,
    });
  } catch (err) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    // next(err);
  }
};

exports.updateMuaPhanBon = async (req, res, next) => {
  try {
    const mua_phan_bon = await new Mua_Phan_Bon({
      landId: req.params.id,
      ten_phan_bon: req.body.ten_phan_bon,
      so_luong: req.body.so_luong,
      nguoi_mua: req.body.nguoi_mua,
      ten_co_so: req.body.ten_co_so,
      dien_thoai: req.body.dien_thoai,
      email: req.body.email,
      thon_xom: req.body.thon_xom,
      xa_phuong: req.body.xa_phuong,
      quan_huyen: req.body.quan_huyen,
      tinh_tp: req.body.tinh_tp,
      quoc_gia: req.body.quoc_gia,
    });
    mua_phan_bon.anh_phan_bon = req.body.anh_phan_bon
      ? strToArr(req.body.anh_phan_bon)
      : null;
    mua_phan_bon.anh_hoa_don = req.body.anh_hoa_don
      ? strToArr(req.body.anh_hoa_don)
      : null;
    const saved = await mua_phan_bon.save();
    const land = await Land.findById(req.params.id);

    land.mua_phan_bon.push(saved.id);

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

// mua thuoc BVTV
exports.getMuaThuocBVTV = async (req, res, next) => {
  try {
    const mua_thuoc_BVTV = await Mua_Thuoc_BVTV.find({ landId: req.params.id });
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: mua_thuoc_BVTV,
    });
  } catch (err) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    // next(err);
  }
};

exports.updateMuaThuocBVTV = async (req, res, next) => {
  try {
    const mua_thuoc_BVTV = await new Mua_Thuoc_BVTV({
      landId: req.params.id,
      ten_thuoc: req.body.ten_thuoc,
      so_luong: req.body.so_luong,
      nguoi_mua: req.body.nguoi_mua,
      ten_co_so: req.body.ten_co_so,
      dien_thoai: req.body.dien_thoai,
      email: req.body.email,
      thon_xom: req.body.thon_xom,
      xa_phuong: req.body.xa_phuong,
      quan_huyen: req.body.quan_huyen,
      tinh_tp: req.body.tinh_tp,
      quoc_gia: req.body.quoc_gia,
    });
    mua_thuoc_BVTV.anh_thuoc_BVTV = req.body.anh_thuoc_BVTV
      ? strToArr(req.body.anh_thuoc_BVTV)
      : null;
    mua_thuoc_BVTV.anh_hoa_don = req.body.anh_hoa_don
      ? strToArr(req.body.anh_hoa_don)
      : null;
    const saved = await mua_thuoc_BVTV.save();
    const land = await Land.findById(req.params.id);

    land.mua_thuoc_BVTV.push(saved.id);

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

// mua thuoc diet co
exports.getMuaThuocDietCo = async (req, res, next) => {
  try {
    const mua_thuoc_diet_co = await Mua_Thuoc_Diet_Co.find({
      landId: req.params.id,
    });
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: mua_thuoc_diet_co,
    });
  } catch (err) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    // next(err);
  }
};

exports.updateMuaThuocDietCo = async (req, res, next) => {
  try {
    const mua_thuoc_diet_co = await new Mua_Thuoc_Diet_Co({
      landId: req.params.id,
      ten_thuoc: req.body.ten_thuoc,
      so_luong: req.body.so_luong,
      nguoi_mua: req.body.nguoi_mua,
      ten_co_so: req.body.ten_co_so,
      dien_thoai: req.body.dien_thoai,
      email: req.body.email,
      thon_xom: req.body.thon_xom,
      xa_phuong: req.body.xa_phuong,
      quan_huyen: req.body.quan_huyen,
      tinh_tp: req.body.tinh_tp,
      quoc_gia: req.body.quoc_gia,
    });
    mua_thuoc_diet_co.anh_thuoc_diet_co = req.body.anh_thuoc_diet_co
      ? strToArr(req.body.anh_thuoc_diet_co)
      : null;
    mua_thuoc_diet_co.anh_hoa_don = req.body.anh_hoa_don
      ? strToArr(req.body.anh_hoa_don)
      : null;
    const saved = await mua_thuoc_diet_co.save();
    const land = await Land.findById(req.params.id);

    land.mua_thuoc_diet_co.push(saved.id);

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

// thoi tiet
exports.getThoiTiet = async (req, res, next) => {
  try {
    const thoi_tiet = await Thoi_Tiet.find({
      landId: req.params.id,
    });
    res.status(200).json({
      status: 200,
      message: "Lấy thông tin thành công!",
      data: thoi_tiet,
    });
  } catch (err) {
    next(createError(400, "Có lỗi xảy ra, vui lòng thử lại!"));
    // next(err);
  }
};

exports.updateThoiTiet = async (req, res, next) => {
  try {
    const thoi_tiet = await new Thoi_Tiet({
      landId: req.params.id,
      nhiet_do_1: req.body.nhiet_do_1,
      do_am_1: req.body.do_am_1,
      toc_do_gio_1: req.body.toc_do_gio_1,
      luong_mua_1: req.body.luong_mua_1,
      thoi_gian_1: req.body.thoi_gian_1,
      he_thong_iot: req.body.he_thong_iot,
      nhiet_do_2: req.body.nhiet_do_2,
      do_am_2: req.body.do_am_2,
      toc_do_gio_2: req.body.toc_do_gio_2,
      luong_mua_2: req.body.luong_mua_2,
      huong_gio: req.body.huong_gio,
      co2: req.body.co2,
    });

    const saved = await thoi_tiet.save();
    const land = await Land.findById(req.params.id);

    land.thoi_tiet.push(saved.id);

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

// reset land
exports.resetLand = async (req, res, next) => {
  try {
    const oldLand = await Land.findById(req.params.id);
    const newLand = await new Land({
      ten: oldLand.ten,
      thon_xom: oldLand.thon_xom,
      xa_phuong: oldLand.xa_phuong,
      quan_huyen: oldLand.quan_huyen,
      tinh_tp: oldLand.tinh_tp,
      kich_thuoc: oldLand.kich_thuoc,
      toa_do: oldLand.toa_do,
      tinh_trang: oldLand.tinh_trang,
      imagePath: oldLand.imagePath,
      chi_phi: oldLand.chi_phi,
    });
    const saved = await newLand.save();
    res.status(200).json({
      status: 200,
      message: "Lam moi manh dat thanh cong!",
      data: saved,
    });
  } catch (error) {
    next(createError(400, "Co loi xay ra!"));
  }
};
