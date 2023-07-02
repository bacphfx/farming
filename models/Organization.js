const mongoose = require("mongoose");
const OrganizationSchema = new mongoose.Schema(
  {
    ten_to_chuc: {
      type: String,
      required: true,
      unique: true,
    },
    telephone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    ma_to_chuc: {
      type: String,
      required: true,
      unique: true,
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
    image_path: String,
    dai_dien: {
      type: String,
      required: true,
    },
    members: [String],
  },
  { timestamps: true }
);

OrganizationSchema.methods.addMember = function (userId) {
  this.members.push(userId);
  return this.save();
};
module.exports = mongoose.model("Organization", OrganizationSchema);
