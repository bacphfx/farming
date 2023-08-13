const mongoose = require("mongoose");
const thoiVuSchema = new mongoose.Schema({
  landId: {
    type: String,
    required: true,
  },
  nguoi_trong: {
    type: String,
    required: true,
  },
  trang_thai: {
    type: String,
    required: true,
  },
  cay_trong: {
    type: String,
    required: true,
  },
  giong_cay: {
    type: String,
    required: true,
  },
  anh_giong_cay: String,
  thoi_gian_trong: {
    type: Date,
  },
  thoi_gian_thu_hoach: {
    type: Date,
  },
  anh_thuc_hien_trong_xong: [String],
});

module.exports = mongoose.model("Thoi_vu", thoiVuSchema);
