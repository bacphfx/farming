const mongoose = require("mongoose");
const phanBonSchema = new mongoose.Schema({
  landId: {
    type: String,
    required: true,
  },
  nguoi_thuc_hien: {
    type: String,
    required: true,
  },
  ten_phan_bon: {
    type: String,
    required: true,
  },
  loai_phan_bon: {
    type: String,
    required: true,
  },
  cach_thuc_bon: {
    type: String,
    required: true,
  },
  luong_su_dung: {
    type: String,
    required: true,
  },
  thoi_gian: {
    type: Date,
  },
  anh_phan_bon: [String],
});

module.exports = mongoose.model("Phan_bon", phanBonSchema);
