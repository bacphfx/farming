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
  thoi_gian: {
    type: Date,
  },
  anh_truoc_lam_co: String,
  anh_sau_lam_co: String,
});

module.exports = mongoose.model("Lam_co", lamCoSchema);
