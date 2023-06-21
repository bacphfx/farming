const mongoose = require("mongoose");
const thoNhuongSchema = new mongoose.Schema({
  landId: {
    type: String,
    required: true,
  },
  data: [
    {
      time: Date,
      loai_dat: String,
      dinh_duong: String,
      nguon_nuoc: String,
    },
  ],
  images: [String],
});

module.exports = mongoose.model("Tho_nhuong", thoNhuongSchema);
