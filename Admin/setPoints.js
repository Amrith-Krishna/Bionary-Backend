import { Admin } from "../Schema/Admin.js";
import { User } from "../Schema/User.js";

export const setPoints = async (req, res) => {
  try {
    const admin = req.regNumber;

    //AUTHORIZATION
    if (!admin)
      return res
        .status(401)
        .json({ message: "Please Login Again", success: false });
    const foundAdmin = await Admin.findOne({ regNumber: admin });
    if (!foundAdmin)
      return res
        .status(401)
        .json({ message: "Admin Not Found", success: false });
    const target = req.body.target;
    const points = req.body.points;
    const foundTarget = await User.findOne({ regNumber: target });

    //CHECK IF TARGET USER TO SET POINTS IS VALID
    if (!foundTarget)
      return res
        .status(405)
        .json({ message: "Target User Not Found", success: false });

    //SUCCESS
    await User.findOneAndUpdate({ regNumber: target }, { points: points });
    return res.json({ message: "Successfully Updated", success: true });
  } catch (err) {
    res.status(500).json({ message: "Error" });
    console.log(err);
  }
};
