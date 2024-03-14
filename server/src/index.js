import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import db from "./database/index.js";
import { authController, userController, drugController, medicalController } from "../src/controller/index.js";
import { authMiddleware } from "../src/middleware/authMiddleware.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.post("/auth/signin", authController.signIn);
app.post("/auth/signup", authController.signUp);
app.post("/auth/sendOtp", authController.sendOtpForgotPassword);
app.post("/auth/confirmPassword", authController.confirmPassword);
app.post("/changePassword", authMiddleware, authController.changePassword);
app.get("/auth/getInfo", authMiddleware, authController.getInfo);

app.get("/listUser", userController.listUser);
app.post("/addUser", userController.addUser);
app.post("/updateUser", userController.updateUser);

app.get("/listDrug", drugController.listDrug);
app.post("/addDrug", drugController.addDrug);
app.post("/updateDrug", drugController.updateDrug);

app.get("/listMedical", medicalController.listMedical);
app.post("/addMedical", medicalController.addMedical);
app.post("/updateMedical", medicalController.updateMedical);

app.get("/", (req, res) => {
  res.json("Welcome to hospital api");
});

app.listen(PORT, ()=>{
    db.connectDB();
    console.log(`Server running on port ${PORT}`);
})