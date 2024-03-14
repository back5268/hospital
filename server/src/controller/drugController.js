import Drug from "../models/Drug.js";

const listDrug = async (req, res) => {
  try {
    const data = await Drug.findAll({ raw: true });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

const addDrug = async (req, res) => {
  try {
    const {
      name,
      description,
      status,
      price,
      side_effect,
      code_value,
      expiry,
    } = req.body;
    const data = await Drug.create({
      name,
      description,
      status,
      price,
      side_effect,
      code_value,
      expiry,
    });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

const updateDrug = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      status,
      price,
      side_effect,
      code_value,
      expiry,
    } = req.body;
    const data = await Drug.update(
      {
        name,
        description,
        status,
        price,
        side_effect,
        code_value,
        expiry,
      },
      { where: { medication_id: id } }
    );
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export default {
  listDrug,
  addDrug,
  updateDrug,
};
