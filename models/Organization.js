import mongoose from "mongoose";
const OrganizationSchema = new mongoose.Schema(
  {
    ten: {
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
    dia_chi: {
      type: String,
      required: true,
    },
    imagePath: String,
    dai_dien: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Organization", OrganizationSchema);
