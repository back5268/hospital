import DataTypes from "sequelize";
import db from "../database/index.js";

const User = db.sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    otp: {
      type: DataTypes.STRING,
    },
    last_login: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
    underscored: true,
  }
);

export default User;
