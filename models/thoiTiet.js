const mongoose = require("mongoose");
const thoiTietSchema = new mongoose.Schema({
  nhiet_do_1: String,
  do_am_1: String,
  toc_do_gio_1: String,
  luong_mua_1: String,
  he_thong_iot: String,
  nhiet_do_2: String,
  do_am_2: String,
  toc_do_gio_2: String,
  luong_mua_2: String,
  huong_gio: String,
  co2: String,
});

module.exports = mongoose.model("Thoi_Tiet", thoiTietSchema);
