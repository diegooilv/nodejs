import jwt from "jsonwebtoken";

const SECRET_KEY = "akakjsjkajaskjajkasjskjakjaskj"; // Troque por uma chave secreta segura!

// Função para gerar o token
export function gerarToken(usuario) {
  return jwt.sign(
    { id: usuario._id, nome: usuario.nomeDeUsuario }, // payload
    SECRET_KEY, // chave secreta
    { expiresIn: "1h" } // tempo de expiração do token (1 hora)
  );
}

// Função para verificar o token
export function verificarToken(token) {
  try {
    // Verifica o token e retorna o payload (dados do usuário)
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded; // Retorna o payload (id do usuário, nome, etc.)
  } catch (err) {
    // Se ocorrer um erro, verifica o tipo de erro
    if (err.name === "TokenExpiredError") {
      // Caso o token tenha expirado
      return { erro: "Token expirado", message: err.message };
    }
    if (err.name === "JsonWebTokenError") {
      // Caso o token seja inválido
      return { erro: "Token inválido", message: err.message };
    }
    // Qualquer outro erro
    return { erro: "Erro ao verificar token", message: err.message };
  }
}
