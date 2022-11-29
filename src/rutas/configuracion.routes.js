import { Router } from "express";
import { isAuthenticated } from "../helpers/auth.js";
const router = Router();

router.get("/", isAuthenticated, function (req, res) {
  res.render("configuracion/configuracion");
});
export default router;
