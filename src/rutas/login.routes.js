import { Router } from "express";
import passport from "passport";
import { isAuthenticated } from "../helpers/auth.js";
const router = Router();

router.get("/", (req, res) => {
  res.render("login/login"); // render muestra vistas
});

//Procesos
router.post(
  "/sig",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
    failureFlash: true,
  })
);

router.get("/logout", async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(error);
    res.redirect("/login");
  });
});

export default router;
