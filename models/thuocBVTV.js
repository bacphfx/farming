const mongoose = require("mongoose");
const thuocBVTVSchema = new mongoose.Schema({
  landId: {
    type: String,
    required: true,
  },
  ten_thuoc: {
    type: String,
    required: true,
  },
  so_luong: {
    type: String,
    required: true,
  },
  thoi_gian: {
    type: Date,
  },
  images: [String],
});

module.exports = mongoose.model("Thuoc_Bao_Ve_Thuc_Vat", thuocBVTVSchema);
