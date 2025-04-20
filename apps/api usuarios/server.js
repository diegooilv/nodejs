import app from "./app.js";
import { conectarDB } from "./database.js";

const startServer = async () => {
  try {
    await conectarDB();
    console.log("Banco de dados conectado com sucesso!");

    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  }
};

startServer(); // Inicia o servidor
