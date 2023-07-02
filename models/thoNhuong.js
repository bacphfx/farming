const mongoose = require("mongoose");
const thoNhuongSchema = new mongoose.Schema({
  landId: String,
  ngay_cap_nhat: Date,
  loai_dat: String,
  dinh_duong: String,
  nguon_nuoc: String,

  images: [String],
});

module.exports = mongoose.model("Tho_nhuong", thoNhuongSchema);
