import { Router } from "express";
import {
  add,
  getAgregar,
  gettrabajador,
  borrar,
  VistaActualizar,
  update,
  ApigetTrabajador,
  ApigetTrabajadorDatos,
} from "../controlador/trabajador.controller.js";
import { isAuthenticated } from "../helpers/auth.js";
import {
  isAdmin,
  isDesigner,
  isJefatura,
  isStore,
} from "../helpers/redirection.js";
const router = Router();

router.get("/", isAuthenticated, gettrabajador);
router.get("/actualizar/:id", isAuthenticated, isAdmin, VistaActualizar);
router.get("/agregar", isAuthenticated, isAdmin, getAgregar);

router.post("/agregar", isAuthenticated, isAdmin, add);
router.delete("/delete/:id", isAuthenticated, isAdmin, borrar);
router.put("/update/:id", isAuthenticated, update);

//ruta Api
router.get("/api", isAuthenticated, ApigetTrabajador);
router.post("/api/letra", isAuthenticated, ApigetTrabajadorDatos);

export default router;
