const mongoose = require("mongoose");
const sinhTruongSchema = new mongoose.Schema({
  landId: {
    type: String,
    required: true,
  },
  cay_giong: {
    nguoi_thuc_hien: String,
    anh_cay_giong: [String],
    thoi_gian: String,
  },
  cay_o_vuon_uom: {
    nguoi_thuc_hien: String,
    anh_cay_o_vuon_uom: [String],
    thoi_gian: String,
  },
  ra_hoa: {
    nguoi_thuc_hien: String,
    anh_ra_hoa: [String],
    thoi_gian: String,
  },
  dau_qua: {
    nguoi_thuc_hien: String,
    anh_dau_qua: [String],
    thoi_gian: String,
  },
  qua_gia_chin: {
    nguoi_thuc_hien: String,
    anh_qua_gia_chin: [String],
    thoi_gian: String,
  },
});

module.exports = mongoose.model("Sinh_truong", sinhTruongSchema);
