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
});

module.exports = mongoose.model("Land", LandSchema);
