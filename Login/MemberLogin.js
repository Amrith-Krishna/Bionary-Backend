import bcrypt from "bcryptjs";
import { Member } from "../Schema/Member";
import { Generate_JWT_Cookie } from "../Authentication/GenerateJWT";

export const memberLogin = async (req, res) => {
  const { regNumber, password } = req.body;
  //CHECK FOR REG NUMBER FORMAT
  if (!/^[0-9]{2}[A-Z]{3}[0-9]{4}$/.test(regNumber)) {
    return res
      .status(400)
      .json({ message: "Invalid Registration Number", success: true });
  }

  //CHECK IF MEMBER EXISTS
  const foundMember = await Member.findOne({ regNumber });
  if (!foundMember)
    return res.status(400).json({ message: "Member Not Found", success: false });

  //CHECK PASSWORD
  if (!bcrypt.compare(password, foundMember.password))
    return res
      .status(401)
      .json({ message: "Incorrect Password", success: false });

  //SUCCESSFUL LOGIN
  const { cookie, config } = Generate_JWT_Cookie(foundAdmin._id, "Member");
  return res
    .cookie(cookie, config)
    .json({ message: "Login Successful", success: true });
};
