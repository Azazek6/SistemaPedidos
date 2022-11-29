import { Router } from "express";
import {
  add,
  getAgregar,
  getCliente,
  borrar,
  VistaActualizar,
  update,
  ApigetCliente,
  ApigetClienteDatos,
} from "../controlador/cliente.controller.js";
import { isAuthenticated } from "../helpers/auth.js";
import {
  isAdmin,
  isDesigner,
  isJefatura,
  isStore,
} from "../helpers/redirection.js";

const router = Router();

router.get("/", isAuthenticated, getCliente);
router.get("/actualizar/:id", isAuthenticated, VistaActualizar);
router.get("/agregar", isAuthenticated, getAgregar);

router.post("/agregar", isAuthenticated, add);
router.delete("/delete/:id", isAuthenticated, borrar);
router.put("/update/:id", isAuthenticated, update);

//ruta Api
router.get("/api", isAuthenticated, ApigetCliente);
router.post("/api/letra", isAuthenticated, ApigetClienteDatos);

export default router;
