import bcrypt from "bcryptjs";
import { User } from "../Schema/User";
import { generateJWTCookie } from "../Authentication/GenerateJWT";

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
    return res
      .status(400)
      .json({ message: "User Not Found", success: false });

  //CHECK PASSWORD
  if (!bcrypt.compare(password, foundUser.password))
    return res
      .status(401)
      .json({ message: "Incorrect Password", success: false });

  //SUCCESSFUL LOGIN
  const { cookie, config } = generateJWTCookie(foundUser._id, "User");
  return res
    .cookie(cookie, config)
    .json({ message: "Login Successful", success: true });
};
