const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
  url: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Banner", BannerSchema);
