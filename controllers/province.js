const Province = require("../models/Province.js");
const createError = require("../utils/error.js");

exports.getProvinces = async (req, res, next) => {
  try {
    const data = await Province.find();
    const provinces = data.map((data) => {
      return { name: data.name, code: data.code };
    });
    res.status(200).json({
      status: 200,
      message: "Lấy dữ liệu thành công!",
      data: provinces,
    });
  } catch (error) {
    next(createError(404, "Lỗi không xác định"));
  }
};

exports.getDistricts = async (req, res, next) => {
  try {
    const data = await Province.findOne({ code: req.query.p });
    const districts = data.districts.map((data) => {
      return { name: data.name, code: data.code };
    });
    res.status(200).json({
      status: 200,
      message: "Lấy dữ liệu thành công!",
      data: districts,
    });
  } catch (error) {
    next(createError(404, "Lỗi không xác định"));
  }
};

exports.getWards = async (req, res, next) => {
  try {
    const data = await Province.findOne({ code: req.query.p });
    const wards = data.districts
      .filter((d) => d.code == req.query.d)[0]
      .wards.map((ward) => {
        return { name: ward.name, code: ward.code };
      });
    res.status(200).json({
      status: 200,
      message: "Lấy dữ liệu thành công!",
      data: wards,
    });
  } catch (error) {
    next(createError(404, "Lỗi không xác định"));
  }
};
