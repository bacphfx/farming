const mongoose = require("mongoose");
const dinhDuongSchema = new mongoose.Schema({
  landId: {
    type: String,
    required: true,
  },
  nguoi_cap_nhat: {
    type: String,
    required: true,
  },
  hien_tuong: {
    type: String,
    required: true,
  },
  ket_qua_do: {
    type: String,
    required: true,
  },
  thoi_gian: {
    type: String,
  },
  anh_dinh_duong: [String],
});

module.exports = mongoose.model("Dinh_duong", dinhDuongSchema);