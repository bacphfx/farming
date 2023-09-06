const mongoose = require("mongoose");
const chamSocSchema = new mongoose.Schema({
  landId: {
    type: String,
    required: true,
  },
  tia_canh: {
    nguoi_thuc_hien: String,
    anh_tia_canh: [String],
    thoi_gian: String,
  },
  vun_goc: {
    nguoi_thuc_hien: String,
    anh_vun_goc: [String],
    thoi_gian: String,
  },
  bao_trai: {
    nguoi_thuc_hien: String,
    anh_bao_trai: [String],
    thoi_gian: String,
  },
});

module.exports = mongoose.model("Ky_thuat_cham_soc", chamSocSchema);
