import { Sequelize } from "sequelize";
import Medical from "../models/Medical.js";

const listMedical = async (req, res) => {
  try {
    const where = {};
    if (req.query?.name)
      where.patients_name = {
        [Sequelize.Op.like]: `%${req.query?.name}%`,
      };
    const data = await Medical.findAll({ where, raw: true });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

const addMedical = async (req, res) => {
  try {
    const {
      medical_record_id,
      patients_name,
      diagnosis_history,
      treatment_history,
      allergies,
      current_medication,
    } = req.body;
    const data = await Medical.create({
      medical_record_id,
      patients_name,
      diagnosis_history,
      treatment_history,
      allergies,
      current_medication,
    });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

const updateMedical = async (req, res) => {
  try {
    const {
      id,
      medical_record_id,
      patients_name,
      diagnosis_history,
      treatment_history,
      allergies,
      current_medication,
    } = req.body;
    const data = await Medical.update({
      medical_record_id,
      patients_name,
      diagnosis_history,
      treatment_history,
      allergies,
      current_medication,
    }, { where: { medical_record_id: id } });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export default {
  listMedical,
  addMedical,
  updateMedical
};
