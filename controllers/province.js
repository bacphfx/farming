import Province from "../models/Province.js";

export const getProvinces = async (req, res, next) => {
  try {
    const data = await Province.find();
    const provinces = data.map((data) => {
      return { name: data.name, code: data.code };
    });
    res.status(200).json(provinces);
  } catch (error) {
    next(error);
  }
};

export const getDistricts = async (req, res, next) => {
  try {
    const data = await Province.findOne({ code: req.query.p });
    const districts = data.districts.map((data) => {
      return { name: data.name, code: data.code };
    });
    res.status(200).json(districts);
  } catch (error) {
    next(error);
  }
};

export const getWards = async (req, res, next) => {
  try {
    const data = await Province.findOne({ code: req.query.p });
    const wards = data.districts
      .filter((d) => d.code == req.query.d)[0]
      .wards.map((ward) => {
        return { name: ward.name, code: ward.code };
      });
    res.status(200).json(wards);
  } catch (error) {
    next(error);
  }
};
