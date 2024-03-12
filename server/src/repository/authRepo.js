import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User";
dotenv.config();

export const signinRp = async ({ username, password }) => {
  const checkUsername = await User.findOne({ username: username });
  if (!checkUsername) return { mess: "Không tìm thấy người dùng!" };
  const passLogin = await bcrypt.compare(password, checkUsername.password);
  if (!passLogin) return { mess: "Mật khẩu không hợp lệ!" };
  const token = jwt.sign(
    { id: checkUsername.id },
    process.env.JWT_SECRET_TOKEN
  );
  return { data: token };
};
