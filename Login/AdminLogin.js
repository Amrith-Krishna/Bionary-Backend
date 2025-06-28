import bcrypt from "bcryptjs";
import { Admin } from "../Schema/Admin.js";
import { Generate_JWT_Cookie } from "../Authentication/GenerateJWT.js";

export const adminLogin = async (req, res) => {
  const { regNumber, password } = req.body;
  //CHECK FOR REG NUMBER FORMAT
  if (!/^[0-9]{2}[A-Z]{3}[0-9]{4}$/.test(regNumber)) {
    return res
      .status(400)
      .json({ message: "Invalid Registration Number", success: true });
  }

  //CHECK IF ADMIN EXISTS
  const foundAdmin = await Admin.findOne({ regNumber });
  if (!foundAdmin)
    return res.status(400).json({ message: "Admin Not Found", success: false });

  //CHECK PASSWORD
  if (!bcrypt.compare(password, foundAdmin.password))
    return res
      .status(401)
      .json({ message: "Incorrect Password", success: false });

  //SUCCESSFUL LOGIN
  Admin.findOneAndUpdate(
    { regNumber },
    { ...foundUser, lastLogin: new Date() }
  );
  const { cookie, config } = Generate_JWT_Cookie(foundAdmin._id, "Admin");
  return res
    .cookie(cookie, config)
    .json({ message: "Login Successful", success: true });
};
