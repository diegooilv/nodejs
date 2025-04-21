import usuario from "../models/user.js";
import { gerarHashDaSenha } from "../utils/gerarHash.js";
import { compararSenhas } from "../utils/compararSenha.js";
import { gerarToken } from "../utils/tokenLogin.js";

const userController = {
  registrarUsuario: async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }
    try {
      const usuarioExistente = await usuario.findOne({ email });
      if (usuarioExistente) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }

      // Aqui, geramos a hash da senha
      const senhaHashed = await gerarHashDaSenha(password);

      // Criamos o novo usuário com a senha hashada
      const novoUsuario = new usuario({ name, email, password: senhaHashed });
      await novoUsuario.save();

      return res
        .status(201)
        .json({ message: "Usuário cadastrado com sucesso" });
    } catch (error) {
      console.error("Erro no cadastro de usuário:", error); // Captura o erro real
      return res.status(500).json({ message: "Erro ao verificar email" });
    }
  },

  deletarUsuario: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID não fornecido!" });
    }
    try {
      const usuarioDeletado = await usuario.findByIdAndDelete(id);
      if (!usuarioDeletado) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }
      return res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar usuário!" });
    }
  },

  atualizarUsuario: async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    if (!id) {
      return res.status(400).json({ message: "ID não fornecido" });
    }
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }
    try {
      const usuarioAtualizado = await usuario.findByIdAndUpdate(
        id,
        { name, email, password },
        { new: true }
      );
      if (!usuarioAtualizado) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      return res.status(200).json({
        message: "Usuário atualizado com sucesso",
        usuario: usuarioAtualizado,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  },
  me: async (req, res) => {
    const id = req.UsuarioId;
    if (!id) {
      return res.status(400).json({ message: "ID não fornecido" });
    }
    try {
      const usuarioEncontrado = await usuario.findById(id);
      if (!usuarioEncontrado) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      return res.status(200).json({ usuario: usuarioEncontrado });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar usuário" });
    }
  },

  loginUsuario: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }
    try {
      const usuarioEncontrado = await usuario.findOne({ email });
      if (!usuarioEncontrado) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      const senhaCorreta = await compararSenhas(
        password,
        usuarioEncontrado.password
      );
      if (!senhaCorreta) {
        return res.status(401).json({ message: "Senha incorreta" });
      }
      return res.status(200).json({
        message: "Login realizado com sucesso",
        token: gerarToken(usuarioEncontrado._id),
      });
    } catch (error) {
      console.error("Erro no login de usuário:", error); // Captura o erro real
      return res.status(500).json({ message: "Erro ao realizar login" });
    }
  },
};

export default userController;
