const mongoose = require("mongoose");
const thuocBVTVSchema = new mongoose.Schema({
  landId: {
    type: String,
    required: true,
  },
  ten_thuoc: {
    type: String,
    required: true,
  },
  lieu_luong: {
    type: String,
    required: true,
  },
  so_luong: {
    type: String,
    required: true,
  },
  chi_phi: String,
  phuong_phap: String,
  nguoi_thuc_hien: String,
  thoi_gian: String,
  anh_thuoc_BVTV: [String],
  ten_dai_ly: String,
  ten_nguoi_ban: String,
  dia_chi: String,
  dien_thoai: String,
});

module.exports = mongoose.model("Thuoc_Bao_Ve_Thuc_Vat", thuocBVTVSchema);
