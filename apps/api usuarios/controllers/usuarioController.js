import usuario from "../models/usuario.js";

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setUsuario = async (req, res) => {
  console.log(req.body);
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Nome e email são obrigatórios" });
  }
  if (name === "" || email === "") {
    return res
      .status(400)
      .json({ message: "Nome e email não podem ser vazios" });
  }

  try {
    if (await usuario.findOne({ email: email })) {
      return res.status(400).json({ message: "email já cadastrado" });
    }
    const usuarioNovo = new usuario({
      name,
      email,
    });
    await usuario.create(usuarioNovo);
    const usuarioSalvo = await usuarioNovo.save();
    res.status(201).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const patchUsuario = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const usuarioAtualizado = await usuario.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    res.status(200).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await usuario.findByIdAndDelete(id);
    res.status(200).json({ message: "Usuario deletado com sucesso" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioEncontrado = await usuario.findById(id);
    if (!usuarioEncontrado) {
      const usuarios = await usuario.find();
      return res.status(404).json(usuarios);
    }
    res.status(200).json(usuarioEncontrado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
