import { signinRp } from "../repository";

export const getInfo = async (req, res) => {
  try {
    res.json({ status: true, data: req.userInfo });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const signIn = async (req, res) => {
  try {
    const { data, mess } = await signinRp(req.body);
    if (data && !mess) res.json({ status: true, data });
    else res.status(400).json({ status: false, mess });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
