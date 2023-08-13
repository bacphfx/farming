const mongoose = require("mongoose");
const thuHoachSchema = mongoose.Schema({
  nguoi_thuc_hien: {
    type: String,
    require: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  thoi_gian_thu_hoach: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model("Thu_hoach", thuHoachSchema);
