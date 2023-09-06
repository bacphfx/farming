const mongoose = require("mongoose");
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
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avata: String,
    thon_xom: {
      type: String,
    },
    xa_phuong: {
      type: String,
    },
    quan_huyen: {
      type: String,
    },
    tinh_tp: {
      type: String,
    },
    ma_gioi_thieu: String,
    organization: [
      {
        organizationId: String,
        isFounder: { type: Boolean },
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: Number,
  },
  { timestamps: true }
);

UserSchema.methods.createOrganization = function (org) {
  const orgId = org._id.toString();
  const newOrg = { organizationId: orgId, isFounder: true };
  this.organization.push(newOrg);
  return this.save();
};

UserSchema.methods.joinOrganization = function (org) {
  const orgId = org._id.toString();
  const newOrg = { organizationId: orgId, isFounder: false };
  this.organization.push(newOrg);
  return this.save();
};

module.exports = mongoose.model("User", UserSchema);
