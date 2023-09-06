const mongoose = require("mongoose");
const muaThuocBVTVSchema = new mongoose.Schema({
  ten_thuoc: String,
  so_luong: String,
  thoi_gian: String,
  nguoi_mua: String,
  anh_thuoc_BVTV: [String],
  anh_hoa_don: [String],
  ten_co_so: String,
  dien_thoai: String,
  email: String,
  thon_xom: String,
  xa_phuong: String,
  quan_huyen: String,
  tinh_tp: String,
  quoc_gia: String,
});

module.exports = mongoose.model("muaThuocBVTV", muaThuocBVTVSchema);
