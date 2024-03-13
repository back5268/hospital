import User from "../models/User.js";
import bcrypt from "bcrypt";

const listUser = async (req, res) => {
  try {
    const data = await User.findAll({ where: { role: "Staff" }, raw: true });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

const addUser = async (req, res) => {
  try {
    const { username, password, email, full_name, phone, address, code } =
      req.body;
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
      phone,
      address,
      code,
      role: "Staff",
    });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export default {
  listUser,
  addUser,
};
