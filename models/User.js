import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    fullname: {
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
    password: {
      type: String,
      required: true,
    },
    image_path: String,
    ma_gioi_thieu: String,
    ma_to_chuc: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
