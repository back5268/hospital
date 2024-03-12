import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";

const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  timezone: "+07:00",
  dialect: "mysql",
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
};

const connectDB = () => {
  if (config && config.database && config.username && config.host) {
    return new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );
  }
  console.log("không tìm thấy thông tim kết nối database");
};

const sequelize = connectDB()
export default { sequelize, connectDB };
