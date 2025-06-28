import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const { SECRET_ACCESS_KEY } = process.env;

export const Generate_JWT_Cookie = (_id) => {
  const cookie = jwt.sign({ _id }, SECRET_ACCESS_KEY, { expiresIn: "15m" });
  return {
    cookie,
    config: {
      maxAge: 900000, //VALID FOR 15 MIN
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      signed: true
    },
  };
};
