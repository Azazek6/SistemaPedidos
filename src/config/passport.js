import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import pool from "./database.js";
import { passwordVerify } from "../helpers/auth.js";

passport.use(
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      const [users] = await pool.query(
        "SELECT * FROM usuario WHERE Usuario = ?",
        [username]
      );
      if (users.length > 0) {
        const user = users[0];
        const match = await passwordVerify(password, user.Contraseña);
        if (match) {
          return done(null, user, { text: "USUARIO CORRECTO" });
        } else {
          return done(null, false, { text: "CONTRASEÑA INCORRECTA" });
        }
      } else {
        return done(null, false, { text: "USUARIO NO ENCONTRADO" });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.Id);
});

passport.deserializeUser(async (id, done) => {
  const [rows] = await pool.query("SELECT * FROM usuario WHERE Id = ?", [id]);
  done(null, rows[0]);
});
