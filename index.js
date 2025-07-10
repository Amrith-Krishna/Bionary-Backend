//PACKAGES
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import cron from "node-cron";

//OTHER FILES
import { adminLogin } from "./Login/AdminLogin.js";
import { userLogin } from "./Login/userLogin.js";
import { authenticateAdmin } from "./Authentication/authenticateAdmin.js";
import { authenticateUser } from "./Authentication/authenticateUser.js";
import { setPoints } from "./Admin/setPoints.js";
import { getLeaderboard } from "./User/getLeaderboard.js";
import { resetFailedLoginAttemptsForAllUsers } from "./Authentication/resetFailedLogins.js";

//CONFIG
dotenv.config();
const { URI, PORT, COOKIE_SECRET } = process.env;
const corsOptions = {
  origin: "*", //SET TO WEBSITE URL
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser(COOKIE_SECRET));

//CONNECT TO MONGODB
mongoose
  .connect(URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

//LOGIN ROUTES
app.post("/user-login", userLogin);
//REQ: {regNumber: "12ABC1234", password: "password"} //RES: {message: "message", success: true}, JWT
app.post("/admin-login", adminLogin);
//REQ: {regNumber: "12ABC1234", password: "password"} //RES: {message: "message", success: true}, JWT

//ADMIN ROUTES
/*app.post("/admin/add-user", authenticateAdmin, addUser); //NOT IMPLEMENTED
app.post("/admin/add-project", authenticateAdmin, addProject); //NOT IMPLEMENTED
app.post("/admin/modify-project", authenticateAdmin, modifyProject); //NOT IMPLEMENTED
app.post("/admin/add-event", authenticateAdmin, addEvent); //NOT IMPLEMENTED
*/
app.post("/admin/set-points", authenticateAdmin, setPoints);
//REQ: JWT, {target: RegNumber of User, points: Integer}

//USER ROUTES
app.post("/user/get-leaderboard", authenticateUser, getLeaderboard);
//REQ: JWT, {filterDepartment: Optional}
//RES: {leaderboard: Array of User{name, regnumber, points, rank}} in ascending order rank 1,2,3...

//RESET LOGIN ATTEMPTS AT MIDNIGHT
cron.schedule("0 0 * * *", () => {
  console.log("Running daily points update...");
  resetFailedLoginAttemptsForAllUsers();
});

//START SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
