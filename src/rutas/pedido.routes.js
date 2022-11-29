import { Router } from "express";
import {
  obtenerTotalPedidos,
  add,
  getAgregar,
  getPedido,
  borrar,
  VistaActualizar,
  update,
  endProccess,
  getDetailP,
  getDetailOneP,
  getOneDetailGrafic,
  ApigetPedido,
  ApigetPedidoDatos,
  apiCliunico,
  apiTraunico,
  apiProunico,
  apipedunico,
} from "../controlador/pedido.controller.js";
import { isAuthenticated } from "../helpers/auth.js";
import {
  isAdmin,
  isDesigner,
  isJefatura,
  isStore,
} from "../helpers/redirection.js";

const router = Router();

router.get("/", isAuthenticated, getPedido);
router.get("/actualizar/:id", isAuthenticated, VistaActualizar);
router.get("/agregar", isAuthenticated, getAgregar);
router.post("/end/:id", isAuthenticated, endProccess);

router.post("/agregar", isAuthenticated, add);
router.delete("/delete/:id", isAuthenticated, borrar);
router.put("/updates/:id", isAuthenticated, update);

//ruta Api
router.get("/api", isAuthenticated, ApigetPedido);
router.get("/api/count", isAuthenticated, obtenerTotalPedidos);
router.post("/api/letra", isAuthenticated, ApigetPedidoDatos);
router.post("/api/clienteone", isAuthenticated, apiCliunico);
router.post("/api/empleadone", isAuthenticated, apiTraunico);
router.post("/api/productone", isAuthenticated, apiProunico);
router.post(`/api/pedidone`, isAuthenticated, apipedunico);
router.get("/api/detail", isAuthenticated, getDetailP);
router.post("/api/detail/one", isAuthenticated, getDetailOneP);
router.post("/api/detail", isAuthenticated, getOneDetailGrafic);

export default router;
