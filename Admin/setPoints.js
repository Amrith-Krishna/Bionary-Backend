import { Admin } from "../Schema/Admin";
import { User } from "../Schema/User";

export const setPoints = async (req, res) => {
  const admin = req.body.user;
  if (!admin)
    return res
      .status(401)
      .json({ message: "Please Login Again", success: false });
  const foundAdmin = await Admin.findOne({ regNumber: admin });
  if (!foundAdmin)
    return res.status(401).json({ message: "Admin Not Found", success: false });
  const target = req.body.target;
  const points = req.body.points;
  const foundTarget = await User.findOne({ regNumber: target });
  if (!foundTarget)
    return res
      .status(405)
      .json({ message: "Target User Not Found", success: false });
  User.findOneAndUpdate({ regNumber: target }, { points });
  return res.json({ message: "Successfully Updated", success: true });
};
