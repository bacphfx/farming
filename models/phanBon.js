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
  so_luong: {
    type: String,
    required: true,
  },
  luong_su_dung: {
    type: String,
    required: true,
  },
  thanh_tien: {
    type: String,
    required: true,
  },
  thoi_gian: {
    type: String,
  },
  anh_phan_bon: [String],
  ten_dai_ly: {
    type: String,
  },
  ten_nguoi_ban: {
    type: String,
  },
  dia_chi: {
    type: String,
  },
  so_dien_thoai: {
    type: String,
  },
});

module.exports = mongoose.model("Phan_bon", phanBonSchema);
