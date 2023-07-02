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
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  images: [String],
});

module.exports = mongoose.model("Thoi_vu", thoiVuSchema);
