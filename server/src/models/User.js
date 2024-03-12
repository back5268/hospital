import DataTypes from "sequelize";
import db from "../database/index.js";

const User = db.sequelize.define(
  "users",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
    contact_details: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    underscored: true,
  }
);

export default User;
