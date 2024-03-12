import { authController } from "../controller/index.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const routes = (app) => {
  app.post("/auth/signin", authController.signIn);
  app.get("/auth/getInfo", authMiddleware, authController.getInfo);
  app.get("/", (req, res) => {
    res.json("Welcome to hospital api");
  });
};
