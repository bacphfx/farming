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
    type: Date,
  },
  images: [String],
});

module.exports = mongoose.model("Dinh_duong", dinhDuongSchema);
