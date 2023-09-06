const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const createError = require("../utils/error.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.register = async (req, res, next) => {
  try {
    const userByPhone = await User.findOne({ telephone: req.body.telephone });
    if (userByPhone)
      return next(createError(404, "Số điện thoại đã được sử dụng"));
    const userByEmail = await User.findOne({ email: req.body.email });
    if (userByEmail) return next(createError(404, "Email đã được sử dụng"));
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const resetToken = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);

    const newUser = new User({
      ...req.body,
      password: hash,
      resetPasswordToken: resetToken,
    });

    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, resetPasswordToken, ...otherDetails } =
      newUser._doc;
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

exports.login = async (req, res, next) => {
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
      { id: user._id, telephone: user.telephone, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, resetPasswordToken, ...otherDetails } =
      user._doc;
    res
      .cookie("access_token", token)
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

exports.changePassword = async (req, res, next) => {
  const currentUser = await User.findOne({ telephone: req.user.telephone });
  const oldPassword = req.body.oldPassword;

  // Lấy mật khẩu mới từ người dùng
  const newPassword = req.body.newPassword;
  const repeatPassword = req.body.repeatPassword;

  // Kiểm tra xem mật khẩu cũ có chính xác hay không

  const isValidOldPassword = await bcrypt.compare(
    oldPassword,
    currentUser.password
  );
  if (!isValidOldPassword) {
    res
      .status(401)
      .json({ status: 401, message: "Mật khẩu cũ không chính xác" });
    return;
  }

  // Mã hóa mật khẩu mới
  if (repeatPassword !== newPassword) {
    res
      .status(401)
      .json({ status: 401, message: "Mật khẩu nhap lai không chính xác" });
    return;
  }
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // Cập nhật mật khẩu mới cho người dùng
  await User.updateOne(
    { telephone: req.user.telephone },
    { password: hashedNewPassword }
  );

  // Thông báo cho người dùng rằng mật khẩu đã được đổi thành công
  res
    .status(200)
    .json({ status: 200, message: "Mật khẩu đã được đổi thành công" });
};

exports.deleteUser = async (req, res, next) => {
  // Lấy username của người dùng
  const currentUser = await User.findOne({ telephone: req.user.telephone });

  // Lấy mật khẩu của người dùng
  const password = req.body.password;

  // Xác minh mật khẩu
  const isValidPassword = await bcrypt.compare(password, currentUser.password);
  if (!isValidPassword) {
    res.status(401).json({ status: 401, message: "Mật khẩu không chính xác" });
    return;
  }

  // Xóa tài khoản của người dùng
  await User.deleteOne({ telephone: currentUser.telephone });

  // Thông báo cho người dùng rằng tài khoản đã được xóa thành công
  res
    .status(200)
    .json({ status: 200, message: "Tài khoản đã được xóa thành công" });
};

function sendResetPasswordEmail(email, token) {
  // Gửi email xác nhận đến người dùng
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "bacphfx16330@funix.edu.vn",
      pass: "BunDau2210",
    },
  });

  const mailOptions = {
    from: "bacphfx16330@funix.edu.vn",
    to: email,
    subject: "Reset password",
    text: `
      Ma xac thuc de reset mat khau cua ban la ${token}, co hieu luc trong 10 phut!
    `,
  };

  transporter.sendMail(mailOptions);
}

// Hàm để xác minh token reset password
async function isValidResetPasswordToken(token) {
  // Lấy thời gian tạo token
  const createdAt = new Date(token.createdAt);

  // Kiểm tra xem token đã hết hạn hay chưa
  const now = new Date();
  if (now > createdAt.getTime() + 1000 * 60 * 10) {
    return false;
  }

  // Kiểm tra xem token có tồn tại hay không
  const user = await User.findOne({ resetPasswordToken: token });
  if (!user) {
    return false;
  }
  const newResetPasswordToken = Math.floor(
    Math.random() * (9999 - 1000 + 1) + 1000
  );
  user.resetPasswordToken = newResetPasswordToken;
  await user.save();

  // Token hợp lệ
  return true;
}

exports.sendEmail = async (req, res) => {
  // Lấy email của người dùng
  const email = req.body.email;

  // Kiểm tra xem email có tồn tại hay không
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).send("Người dùng không tồn tại");
    return;
  }

  // Gửi email xác nhận đến người dùng
  sendResetPasswordEmail(email, user.resetPasswordToken);

  // Thông báo cho người dùng rằng email xác nhận đã được gửi
  res.status(200).send("Email xác nhận đã được gửi");
};

exports.resetPassword = async (req, res) => {
  // Lấy token reset password
  const token = req.query.token;

  // Kiểm tra xem token có hợp lệ hay không
  const isValidToken = await isValidResetPasswordToken(token);
  if (!isValidToken) {
    res.status(401).send("Token reset password không hợp lệ");
    return;
  }

  // Lấy mật khẩu mới từ người dùng
  const newPassword = req.body.newPassword;

  // Mã hóa mật khẩu mới
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // Cập nhật mật khẩu mới cho người dùng
  await User.updateOne(
    { email: req.query.email },
    { password: hashedNewPassword }
  );

  // Thông báo cho người dùng rằng mật khẩu đã được reset thành công
  res.status(200).send("Mật khẩu đã được reset thành công");
};
