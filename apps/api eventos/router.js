import express from "express";
import userController from "./controllers/userController.js";
import eventoController from "./controllers/eventoController.js";
import userMiddleware from "./middlewares/userMiddleware.js";
import eventoMiddleware from "./middlewares/eventoMiddleware.js";
const router = express.Router();

router.post("/registrar", userController.registrarUsuario);
router.post("/login", userController.loginUsuario);
router.get("/me", userMiddleware.verificarLogin, userController.me);

router.get("/eventos", eventoController.listarEventos);
router.get("/eventos/:id", eventoController.listarEventosPorId);
router.post(
  "/eventos",
  userMiddleware.verificarLogin,
  eventoController.criarEvento
);
router.delete(
  "/eventos/:id",
  userMiddleware.verificarLogin,
  eventoMiddleware.verificarDono,
  eventoController.deletarEvento
);
router.put(
  "/eventos/:id",
  userMiddleware.verificarLogin,
  eventoMiddleware.verificarDono,
  eventoController.atualizarEvento
);

export default router;
