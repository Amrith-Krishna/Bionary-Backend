import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const { SECRET_ACCESS_TOKEN } = process.env;

export const generateJWTCookie = (_id, role, regNumber) => {
  const cookie = jwt.sign({ _id, role, regNumber }, SECRET_ACCESS_TOKEN, {
    expiresIn: "15m",
  });
  return {
    cookie,
    config: {
      maxAge: 900000, //15min
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      signed: true,
    },
  };
};
