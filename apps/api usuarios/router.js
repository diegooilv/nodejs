import express from "express";
import {
  validateFieldName,
  validateFieldEmail,
  validatePatch,
  validateId,
} from "./middlewares/usuarioMiddleware.js";
import {
  setUsuario,
  patchUsuario,
  deleteUsuario,
  getUsuario,
  getUsuarios,
} from "./controllers/usuarioController.js";
const router = express.Router();

router.get("/user/:id", getUsuario);
router.get("/user", getUsuarios);

router.post("/user", validateFieldName, validateFieldEmail, setUsuario);

router.patch("/user/:id", validatePatch, patchUsuario);

router.delete("/user/:id", validateId, deleteUsuario);

export default router;
