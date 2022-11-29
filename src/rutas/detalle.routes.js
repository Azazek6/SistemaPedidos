import { Router } from "express";
import {
  getReport,
  ApigetReport,
  ApigetReportDatos,
} from "../controlador/report.controller.js";
import { isAuthenticated } from "../helpers/auth.js";
const router = Router();

router.get("/", isAuthenticated, getReport);

router.get("/api", isAuthenticated, ApigetReport);
router.post("/api/letra", isAuthenticated, ApigetReportDatos);

router.get("/generar", isAuthenticated, function (req, res) {
  //ruta
  res.render("reporte/generar"); //Interfaz
});

export default router;
