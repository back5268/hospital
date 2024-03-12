import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

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
    const checkUsername = await User.findOne({ where: {username}, raw: true });
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
    res.json({ status: true, data: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export default {
  getInfo,
  signIn,
};
