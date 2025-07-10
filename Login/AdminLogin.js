import bcrypt from "bcryptjs";
import { Admin } from "../Schema/Admin.js";
import { generateJWTCookie } from "../Authentication/GenerateJWT.js";

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
  if (foundAdmin.failedLoginAttemptsToday >= 5) {
    return res.status(401).json({
      message: "Too Many Failed Login Attempts Today. Try Again Tomorrow.",
      success: false,
    });
  }
  //CHECK PASSWORD
  const match = await bcrypt.compare(password, foundAdmin.password);
  if (!match) {
    await Admin.findOneAndUpdate(
      { regNumber: foundAdmin.regNumber },
      { failedLoginAttemptsToday: foundAdmin.failedLoginAttemptsToday + 1 }
    );
    return res
      .status(401)
      .json({ message: "Incorrect Password", success: false });
  }
  //SUCCESSFUL LOGIN
  Admin.findOneAndUpdate(
    { regNumber },
    { lastLogin: new Date(), failedLoginAttemptsToday: 0 }
  );
  const { cookie, config } = generateJWTCookie(
    foundAdmin._id,
    "Admin",
    regNumber
  );
  return res
    .cookie("auth", cookie, config)
    .json({ message: "Login Successful", success: true });
};
