const mongoose = require("mongoose");
const thuHoachSchema = mongoose.Schema({
  nguoi_thuc_hien: {
    type: String,
    require: true,
  },
  thoi_gian_cap_nhat: {
    type: String,
    require: true,
  },
  san_luong: String,
  gia_ban: String,
  thanh_tien: String,
  dien_tich: String,
});

module.exports = mongoose.model("Thu_hoach", thuHoachSchema);
