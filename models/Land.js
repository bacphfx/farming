const mongoose = require("mongoose");
const LandSchema = new mongoose.Schema({
  orgId: String,
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
  tho_nhuong: [String],
  thoi_vu: [String],
  tuoi_tieu: [String],
  lam_co: [String],
  dinh_duong: [String],
  phan_bon: [String],
  dich_benh: [String],
  thuoc_BVTV: [String],
});

module.exports = mongoose.model("Land", LandSchema);
