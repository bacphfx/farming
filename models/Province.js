const mongoose = require("mongoose");
const ProvinceSchema = new mongoose.Schema({
  name: String,
  code: Number,
  codename: String,
  division_type: String,
  phone_code: Number,
  districts: [
    {
      name: String,
      code: Number,
      codename: String,
      division_type: String,
      short_codename: String,
      wards: [
        {
          name: String,
          code: Number,
          codename: String,
          division_type: String,
          short_codename: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Province", ProvinceSchema);
