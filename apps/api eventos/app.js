import express from "express";
import cors from "cors";
import router from "./router.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use((req, res, next) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

export default app;
