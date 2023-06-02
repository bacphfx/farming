import mongoose from "mongoose";
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

export default mongoose.model("Province", ProvinceSchema);
