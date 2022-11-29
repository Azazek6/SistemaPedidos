import express from "express";
import router from "./rutas/index.js";
import exphbs from "express-handlebars";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import flash from "connect-flash";
import session from "express-session";
import {PORT} from "./config/configuracion.js";
import {
  isAdmin,
  isDesigner,
  isJefatura,
  isStore,
  getNameRols,
} from "./helpers/helpers.js";

import passport from "passport";
import "./config/passport.js";
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set("PORT", PORT);
app.set("views", join(__dirname, "vista"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret_app",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Variables Globales
app.use((req, res, next) => {
  res.locals.mensaje_exito = req.flash("mensaje_exito"); // Mensaje de éxito
  res.locals.mensaje_error = req.flash("mensaje_error"); // Mensaje de error
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  res.locals.rol = getNameRols(req.user);
  res.locals.isDesigner = isDesigner(req.user);
  res.locals.isAdmin = isAdmin(req.user);
  res.locals.isJefatura = isJefatura(req.user);
  res.locals.isStore = isStore(req.user);
  next();
});

app.use(router);

const hbs = exphbs.create({
  defaultLayout: "main", // archivo principal
  layoutsDir: join(app.get("views"), "layouts"),
  partialsDir: join(app.get("views"), "partials"),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    // allowProtoMethodsByDefault: true
  },
  extname: ".hbs",
}); //Plantilla configurada correctamente

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs"); // extension por defecto hbs

app.use(express.static(join(__dirname, "public"))); // carpeta publica

export default app;
