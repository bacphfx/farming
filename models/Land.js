const mongoose = require("mongoose");
const LandSchema = new mongoose.Schema({
  orgId: String,
  userId: String,
  ten: {
    type: String,
    required: true,
  },
  thon_xom: {
    type: String,
  },
  xa_phuong: {
    type: String,
    required: true,
  },
  quan_huyen: {
    type: String,
    required: true,
  },
  tinh_tp: {
    type: String,
    required: true,
  },
  kich_thuoc: {
    type: String,
    required: true,
  },
  toa_do: {
    type: String,
  },
  tinh_trang: {
    type: String,
  },
  imagePath: [String],
  chi_phi: String,
  tho_nhuong: [String],
  thoi_vu: [String],
  tuoi_tieu: [String],
  lam_co: [String],
  dinh_duong: [String],
  phan_bon: [String],
  dich_benh: [String],
  thuoc_BVTV: [String],
  sinh_truong: [String],
  cham_soc: [String],
  thu_hoach: [String],
  mua_cay_giong: [String],
  mua_phan_bon: [String],
  mua_thuoc_BVTV: [String],
  mua_thuoc_diet_co: [String],
  thoi_tiet: [String],
});

module.exports = mongoose.model("Land", LandSchema);
