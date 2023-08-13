const mongoose = require("mongoose");
const thoNhuongSchema = new mongoose.Schema({
  landId: String,
  ngay_cap_nhat: Date,
  ghi_chu: String,
  anh_tho_nhuong: String,
  loai_dat: String,
  dinh_duong: String,
  nguon_nuoc: String,
  anh_nguon_nuoc: [String],
});

module.exports = mongoose.model("Tho_nhuong", thoNhuongSchema);
