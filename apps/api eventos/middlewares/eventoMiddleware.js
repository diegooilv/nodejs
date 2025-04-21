import evento from "../models/evento.js";
const eventoMiddler = {
  verificarFiltros: async (req, res, next) => {
    const { categoria, data, local } = req.body;

    if (!categoria && !data && !local) {
      return res.status(400).json({
        erro: "Pelo menos um campo (categoria, data ou local) deve ser informado.",
      });
    }

    const camposPreenchidos = [categoria, data, local].filter(
      (campo) => campo
    ).length;
    if (camposPreenchidos > 1) {
      return res.status(400).json({
        erro: "Apenas um campo (categoria, data ou local) pode ser informado por vez.",
      });
    }

    const campoNaoNulo = {
      ...(categoria && { categoria }),
      ...(data && { data }),
      ...(local && { local }),
    };

    req.query = campoNaoNulo;

    next();
  },

  verificarDono: async (req, res, next) => {
    const id = req.UsuarioId;
    const eventoId = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "ID não fornecido" });
    }
    if (!eventoId) {
      return res.status(400).json({ message: "ID do evento não fornecido" });
    }
    try {
      const eventoEncontrado = await evento.findById(eventoId);
      console.log(eventoEncontrado);
      if (!eventoEncontrado) {
        return res.status(404).json({ message: "Evento não encontrado" });
      }
      if (eventoEncontrado.dono !== id.toString()) {
        return res.status(403).json({ message: "Acesso negado" });
      } else {
        next();
      }
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao verificar dono do evento",
        error: error.message,
      });
    }
  },
};

export default eventoMiddler;
