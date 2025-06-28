//PACKAGES
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";


//CONFIG
dotenv.config();
const { URI, PORT } = process.env;
const corsOptions = {
  origin: "*", //SET TO WEBSITE URL
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());


//CONNECT TO MONGODB
mongoose
  .connect(URI, { useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


//LOGIN ROUTES
app.post("/ffcs-login",FFCS_Login)
app.post("/admin-login",Admin_Login)

//ADMIN ROUTES
app.post("/admin/add-ffcs-member",Authenticate_Admin,Add_FFCS_Member)
app.post("/admin/add-event",Authenticate_Admin, Add_Event)


//START SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
