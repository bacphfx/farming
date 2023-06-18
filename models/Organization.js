import mongoose from "mongoose";
const OrganizationSchema = new mongoose.Schema(
  {
    ten_to_chuc: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    ma_to_chuc: String,
    dia_chi: {
      type: String,
      required: true,
    },
    image_path: String,
    dai_dien: {
      type: String,
    },
    members: [String],
  },
  { timestamps: true }
);

OrganizationSchema.methods.addMember = function (user) {
  this.members.push(user._id);
  return this.save();
};

export default mongoose.model("Organization", OrganizationSchema);
