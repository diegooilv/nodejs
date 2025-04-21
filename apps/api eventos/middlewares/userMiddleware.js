import { verificarToken } from "../utils/tokenLogin.js";
import usuario from "../models/user.js";
const userMiddleware = {
  verificarLogin: (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }
    const decoded = verificarToken(token);
    if (decoded.erro) {
      return res
        .status(401)
        .json({ erro: decoded.erro, mensagem: decoded.message });
    }
    req.UsuarioId = decoded.id;
    next();
  },

  verificarAdmin: async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID não fornecido" });
    }
    try {
      const usuarioEncontrado = await usuario.findById(id);
      if (!usuarioEncontrado) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      if (!usuarioEncontrado.admin) {
        return res.status(403).json({ message: "Acesso negado" });
      } else {
        next();
      }
    } catch {
      return res.status(500).json({ message: "Erro ao verificar usuário" });
    }
  },
};

export default userMiddleware;
