import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendOtp } from "../lib/axios/index.js";

const getInfo = async (req, res) => {
  try {
    res.json({ status: true, data: req.userInfo });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkUsername = await User.findOne({
      where: { username },
      raw: true,
    });
    if (!checkUsername)
      return res
        .status(400)
        .json({ status: false, mess: "Không tìm thấy người dùng!" });
    const passLogin = await bcrypt.compare(password, checkUsername.password);
    if (!passLogin)
      return res
        .status(400)
        .json({ status: false, mess: "Mật khẩu không hợp lệ!" });
    const token = jwt.sign(
      { user_id: checkUsername.user_id },
      process.env.JWT_SECRET_TOKEN
    );
    await User.update(
      { last_login: new Date() },
      { where: { user_id: checkUsername.user_id } }
    );
    res.json({ status: true, data: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

const signUp = async (req, res) => {
  try {
    const { username, password, email, full_name } = req.body;
    const checkUsername = await User.findOne({
      where: { username },
      raw: true,
    });
    if (checkUsername)
      return res
        .status(400)
        .json({ status: false, mess: "Tài khoản đã tồn tại!" });
    const checkEmail = await User.findOne({ where: { email }, raw: true });
    if (checkEmail)
      return res.status(400).json({ status: false, mess: "Email đã tồn tại!" });

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    const data = await User.create({
      email,
      username,
      password: newPassword,
      full_name,
    });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const sendOtpForgotPassword = async (req, res) => {
  try {
    const { username } = req.body;
    let user;
    user = await User.findOne({
      where: { username },
      raw: true,
    });
    if (!user) {
      user = await User.findOne({
        where: { email: username },
        raw: true,
      });
    }
    if (!user)
      return res
        .status(400)
        .json({ status: false, mess: "Không tìm thấy người dùng!" });

    let otp = "";
    for (var i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    await sendOtp({ to: user.email, otp, username: user.username });
    await User.update({ otp }, { where: { user_id: user.user_id } });
    res.json({ status: true, data: {} });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const confirmPassword = async (req, res) => {
  try {
    const { username, otp, password } = req.body;

    let user;
    user = await User.findOne({
      where: { username },
      raw: true,
    });
    if (!user) {
      user = await User.findOne({
        where: { email: username },
        raw: true,
      });
    }
    if (!user) {
      return res
        .status(400)
        .json({ status: false, mess: "Không tìm thấy người dùng!" });
    }

    if (otp !== user.otp)
      return res
        .status(400)
        .json({ status: false, mess: "Mã OTP không đúng!" });

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    await User.update(
      { otp: "", password: newPassword },
      { where: { user_id: user.user_id } }
    );
    res.status(201).json({ status: true, data: {} });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const passLogin = await bcrypt.compare(password, req.userInfo.password);
    if (!passLogin)
      return res
        .status(400)
        .json({ status: false, mess: "Mật khẩu không hợp lệ!" });

    const salt = await bcrypt.genSalt(10);
    const newPasswordz = await bcrypt.hash(newPassword, salt);

    await User.update(
      { password: newPasswordz },
      { where: { user_id: req.userInfo.user_id } }
    );
    res.status(201).json({ status: true, data: {} });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export default {
  getInfo,
  signIn,
  signUp,
  sendOtpForgotPassword,
  confirmPassword,
  changePassword,
};
