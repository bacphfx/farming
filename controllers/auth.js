import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const user = await User.findOne({ telephone: req.body.telephone });
    if (user) return next(createError(404, "Số điện thoại đã được sử dụng"));
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = newUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        status: 200,
        message: "Đăng ký tài khoản thành công",
        data: { details: { ...otherDetails }, isAdmin, token: token },
      });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ telephone: req.body.telephone });
    if (!user)
      return next(createError(404, "Số điện thoại chưa được đăng ký!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Mật khẩu không chính xác!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        status: 200,
        message: "Đăng nhập thành công",
        data: { details: { ...otherDetails }, isAdmin, token: token },
      });
  } catch (err) {
    next(err);
  }
};
