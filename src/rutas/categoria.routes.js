import { Router } from "express";
import { isAuthenticated } from "../helpers/auth.js";
const router = Router();

router.get("/", isAuthenticated, (req, res) => {
  res.render("categoria/categoria");
});

export default router;
