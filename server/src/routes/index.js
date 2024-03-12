import { signIn } from "../controller/authController";

export const routes = (app) => {
  app.post("/auth/signin", signIn);
  app.get("/", (req, res) => {
    res.json("Welcome to hospital api");
  });
};
