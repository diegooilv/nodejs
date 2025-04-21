import evento from "../models/evento.js";

const eventoController = {
  listarEventos: async (req, res) => {
    try {
      const eventos = await evento.find(req.query);
      return res.status(200).json(eventos);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar eventos",
        error: error.message,
      });
    }
  },

  listarEventosPorId: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID não fornecido" });
    }
    try {
      const eventoEncontrado = await evento.findById(id);
      if (!eventoEncontrado) {
        return res.status(404).json({ message: "Evento não encontrado" });
      }
      return res.status(200).json(eventoEncontrado);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar evento",
        error: error.message,
      });
    }
  },

  criarEvento: async (req, res) => {
    const { nome, data, local, categoria } = req.body;
    if (!nome || !data || !local || !categoria) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }
    try {
      const novoEvento = new evento({
        nome,
        data,
        local,
        categoria,
        dono: req.UsuarioId,
      });
      await novoEvento.save();
      return res.status(201).json({
        message: "Evento criado com sucesso",
        evento: novoEvento,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao criar evento",
        error: error.message,
      });
    }
  },

  deletarEvento: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID não fornecido" });
    }
    try {
      const eventoDeletado = await evento.findByIdAndDelete(id);
      if (!eventoDeletado) {
        return res.status(404).json({ message: "Evento não encontrado" });
      }
      return res.status(200).json({
        message: "Evento deletado com sucesso",
        evento: eventoDeletado,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao deletar evento",
        error: error.message,
      });
    }
  },

  atualizarEvento: async (req, res) => {
    const { id } = req.params;
    const { nome, data, local, categoria } = req.body;
    if (!id) {
      return res.status(400).json({ message: "ID não fornecido" });
    }
    if (!nome || !data || !local || !categoria) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }
    try {
      const eventoAtualizado = await evento.findByIdAndUpdate(
        id,
        { nome, data, local, categoria },
        { new: true }
      );
      if (!eventoAtualizado) {
        return res.status(404).json({ message: "Evento não encontrado" });
      }
      return res.status(200).json({
        message: "Evento atualizado com sucesso",
        evento: eventoAtualizado,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar evento",
        error: error.message,
      });
    }
  },
};

export default eventoController;
