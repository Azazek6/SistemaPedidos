import { Router } from "express";
import { isAuthenticated } from "../helpers/auth.js";
const router = Router();

router.get("/", isAuthenticated, (req, res) => {
  res.render("index"); // render muestra vistas
});

router.get("/home", isAuthenticated, (req, res) => {
  res.render("home"); // render muestra vistas
});

export default router;
