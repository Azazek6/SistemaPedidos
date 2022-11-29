import { Router } from "express";
import { isAuthenticated } from "../helpers/auth.js";
import {
  getAgregar,
  getProducto,
  add,
  borrar,
  VistaActualizar,
  update,
  ApigetProductosDatos,
  ApigetProducto,
} from "../controlador/producto.controller.js";
import {
  isAdmin,
  isDesigner,
  isJefatura,
  isStore,
} from "../helpers/redirection.js";
const router = Router();

router.get("/", isAuthenticated, getProducto);
router.get("/agregar", isAuthenticated, isAdmin, getAgregar);
router.get("/actualizar/:id", isAuthenticated, isAdmin, VistaActualizar);

router.post("/agregar", isAuthenticated, isAdmin, add);
router.delete("/delete/:id", isAuthenticated, isAdmin, borrar);
router.put("/update/:id", isAuthenticated, isAdmin, update);

//ruta Api
router.get("/api", isAuthenticated, ApigetProducto);
router.post("/api/letra", isAuthenticated, ApigetProductosDatos);

export default router;
