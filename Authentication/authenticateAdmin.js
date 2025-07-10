import { Admin } from "../Schema/Admin.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const { SECRET_ACCESS_TOKEN } = process.env;

export const authenticateAdmin = (req, res, next) => {
  try {
    //GET COOKIE
    const token = req.signedCookies["auth"];

    //CHECK IF COOKIE EXISTS
    if (!token)
      return res
        .status(401)
        .json({ message: "Invalid User or Session Expired(1)" });

    //DECRYPT COOKIE
    jwt.verify(token, SECRET_ACCESS_TOKEN, async (err, user) => {
      if (err) throw new Error(err);
      else {
        console.log(user);
        const foundUser = await Admin.findOne({ regNumber: user.regNumber });
        if (!foundUser) {
          return res
            .status(401)
            .json({ message: "Invalid User or Session Expired(2)" });
        }

        //CHECK USER MATCH
        if (foundUser._id.toString() !== user._id) {
          return res
            .status(401)
            .json({ message: "Invalid User or Session Expired(3)" });
        }

        //SUCCESS
        req.regNumber = foundUser.regNumber;
        next();
      }
    });
  } catch (err) {
    res.json({ message: "Error" });
    console.log(err);
  }
};
