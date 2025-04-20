import mongoose from "mongoose";

export async function conectarDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/API", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🟢 Conectado ao MongoDB local");
  } catch (erro) {
    console.error("❌ Erro ao conectar no MongoDB:", erro);
    throw new Error("Erro na conexão com o MongoDB");
  }
}
