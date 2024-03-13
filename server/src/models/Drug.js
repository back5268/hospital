import DataTypes from "sequelize";
import db from "../database/index.js";

const Drug = db.sequelize.define(
  "medication",
  {
    medication_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
    side_effect: {
      type: DataTypes.STRING,
    },
    code_value: {
      type: DataTypes.STRING,
    },
    expiry: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    underscored: true,
  }
);

export default Drug;
