import bcrypt from "bcryptjs";
import { User } from "../Schema/User.js";
import { generateJWTCookie } from "../Authentication/GenerateJWT.js";

export const userLogin = async (req, res) => {
  const { regNumber, password } = req.body;
  //CHECK FOR REG NUMBER FORMAT
  if (!/^[0-9]{2}[A-Z]{3}[0-9]{4}$/.test(regNumber)) {
    return res
      .status(400)
      .json({ message: "Invalid Registration Number", success: true });
  }

  //CHECK IF USER EXISTS
  const foundUser = await User.findOne({ regNumber });
  if (!foundUser)
    return res.status(400).json({ message: "User Not Found", success: false });

  if (foundUser.failedLoginAttemptsToday >= 5) {
    return res.status(401).json({
      message: "Too Many Failed Login Attempts Today. Try Again Tomorrow.",
      success: false,
    });
  }

  const match = await bcrypt.compare(password, foundUser.password);
  //CHECK PASSWORD
  if (!match) {
    await User.findOneAndUpdate(
      { regNumber: foundUser.regNumber },
      { failedLoginAttemptsToday: foundUser.failedLoginAttemptsToday + 1 }
    );
    return res
      .status(401)
      .json({ message: "Incorrect Password", success: false });
  }

  //SUCCESSFUL LOGIN
  await User.findOneAndUpdate(
    { regNumber: foundUser.regNumber },
    { lastLogin: new Date(), failedLoginAttemptsToday: 0 }
  );
  const { cookie, config } = generateJWTCookie(
    foundUser._id,
    "User",
    regNumber
  );
  return res
    .cookie("auth", cookie, config)
    .json({ message: "Login Successful", success: true });
};
