const Land = require("../models/Land.js");
const Tho_Nhuong = require("../models/thoNhuong.js");
const Thoi_Vu = require("../models/thoiVu.js");
const Tuoi_Tieu = require("../models/tuoiTieu.js");

exports.createLand = async (req, res, next) => {
  const newLand = new Land(req.body);

  try {
    const savedLand = await newLand.save();
    res.status(200).json({
      status: 200,
      message: "Tạo mới mảnh đất thành công",
      data: savedLand,
    });
  } catch (err) {
    next(err);
  }
};
exports.updateLand = async (req, res, next) => {
  try {
    const updatedLand = await Land.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: 200,
      message: "Cập nhật thông tin thành công",
      data: updatedLand,
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteLand = async (req, res, next) => {
  try {
    await Land.findByIdAndDelete(req.params.id);
    res.status(200).json({ stauts: 200, message: "Land has been deleted." });
  } catch (err) {
    next(err);
  }
};
// exports.getLand = async (req, res, next) => {
//   try {
//     const land = await Land.findById(req.params.id);
//     res
//       .status(200)
//       .json({ status: 200, message: "Lấy thông tin thành công!", data: land });
//   } catch (err) {
//     next(err);
//   }
// };

exports.getLands = async (req, res, next) => {
  try {
    const lands = await Land.find();
    res
      .status(200)
      .json({ status: 200, message: "Lấy thông tin thành công!", data: lands });
  } catch (err) {
    next(err);
  }
};

exports.getLand = async (req, res, next) => {
  try {
    const land = await Land.findOne(req.param.landId);
    const list_tho_nhuong = await Promise.all(
      land.tho_nhuong.map((tho_nhuong_id) => {
        return Tho_Nhuong.findById(tho_nhuong_id);
      })
    );
    const list_thoi_vu = await Promise.all(
      land.thoi_vu.map((thoi_vu_id) => {
        return Thoi_Vu.findById(thoi_vu_id);
      })
    );
    const list_tuoi_tieu = await Promise.all(
      land.tuoi_tieu.map((tuoi_tieu_id) => {
        return Tuoi_Tieu.findById(tuoi_tieu_id);
      })
    );
    const data = {
      land: land,
      tho_nhuong: list_tho_nhuong,
      thoi_vu: list_thoi_vu,
      tuoi_tieu: list_tuoi_tieu,
    };
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
