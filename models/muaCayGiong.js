const mongoose = require("mongoose");
const muaCayGiongSchema = new mongoose.Schema({
  ten_hat_giong: String,
  so_luong: String,
  thoi_gian: String,
  nguoi_mua: String,
  anh_cay_giong: [String],
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

module.exports = mongoose.model("muaCayGiong", muaCayGiongSchema);
