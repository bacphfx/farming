const mongoose = require("mongoose");
const LandSchema = new mongoose.Schema({
  ten: {
    type: String,
    required: true,
  },
  dia_chi: {
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
  thoi_vu: {
    type: String,
  },
  tuoi_tieu: {
    type: String,
  },
  lam_co: {
    type: String,
  },
  dinh_duong: {
    type: String,
  },
  phan_bon: {
    type: String,
  },
  dich_benh: {
    type: String,
  },
  thuoc_BVTV: {
    type: String,
  },
  sinh_truong: {
    type: String,
  },
  ky_thuat_cham_soc: {
    type: String,
  },
  thu_hoach: {
    type: String,
  },
});

module.exports = mongoose.model("Land", LandSchema);
