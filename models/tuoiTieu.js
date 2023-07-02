const mongoose = require("mongoose");
const tuoiTieuSchema = new mongoose.Schema({
  landId: {
    type: String,
    required: true,
  },
  nguoi_tuoi: {
    type: String,
    required: true,
  },
  phuong_phap: {
    type: String,
    required: true,
  },
  cong_suat: {
    type: String,
    required: true,
  },
  thoi_luong: {
    type: String,
    required: true,
  },
  thoi_gian: {
    type: Date,
    // required: true,
  },
});

module.exports = mongoose.model("Tuoi_tieu", tuoiTieuSchema);
