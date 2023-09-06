const mongoose = require("mongoose");
const lamCoSchema = new mongoose.Schema({
  landId: {
    type: String,
    required: true,
  },
  nguoi_thuc_hien: {
    type: String,
    required: true,
  },
  phuong_phap: {
    type: String,
    required: true,
  },
  ten_thuoc: String,
  lieu_dung_thuoc: String,
  hinh_anh_thuoc: [String],
  thoi_gian: {
    type: String,
  },
  anh_truoc_lam_co: [String],
  anh_sau_lam_co: [String],
});

module.exports = mongoose.model("Lam_co", lamCoSchema);
