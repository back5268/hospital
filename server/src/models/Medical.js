import DataTypes from "sequelize";
import db from "../database/index.js";

const Medical = db.sequelize.define(
  "medical_record",
  {
    medical_record_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    patients_name: {
      type: DataTypes.STRING,
    },
    diagnosis_history: {
      type: DataTypes.STRING,
    },
    treatment_history: {
      type: DataTypes.STRING,
    },
    allergies: {
      type: DataTypes.STRING,
    },
    current_medication: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    underscored: true,
  }
);

export default Medical;
