import { authController, userController, drugController } from "../controller/index.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const routes = (app) => {

  app.post("/auth/signin", authController.signIn);
  app.post("/auth/signup", authController.signUp);
  app.post("/auth/sendOtp", authController.sendOtpForgotPassword);
  app.post("/auth/confirmPassword", authController.confirmPassword);
  app.post("/changePassword", authMiddleware, authController.changePassword);
  app.get("/auth/getInfo", authMiddleware, authController.getInfo);

  app.get("/listUser", userController.listUser);
  app.post("/addUser", userController.addUser);
  
  app.get("/listDrug", drugController.listDrug);
  app.post("/addDrug", drugController.addDrug);

  app.get("/", (req, res) => {
    res.json("Welcome to hospital api");
  });
};
