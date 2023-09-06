const mongoose = require("mongoose");
const dichBenhSchema = new mongoose.Schema({
  landId: {
    type: String,
    required: true,
  },
  nguoi_thuc_hien: {
    type: String,
    required: true,
  },
  hien_tuong: {
    type: String,
    required: true,
  },
  tac_nhan: {
    type: String,
    required: true,
  },
  thoi_gian: {
    type: String,
  },
  anh_hien_tuong: [String],
  anh_tac_nhan: [String],
});

module.exports = mongoose.model("Dich_benh_hai", dichBenhSchema);
