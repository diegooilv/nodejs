export const validateFieldName = (req, res, next) => {
  const { body } = req;
  if (!body.name) {
    return res.status(400).json({ message: "Campo name é obrigatório" });
  }
  if (body.name === "") {
    return res.status(400).json({ message: "Campo name não pode ser vazio" });
  }
  next();
};

export const validateFieldEmail = (req, res, next) => {
  const { body } = req;
  if (!body.email) {
    return res.status(400).json({ message: "Campo email é obrigatório" });
  }
  if (body.email === "") {
    return res.status(400).json({ message: "Campo email não pode ser vazio" });
  }
  next();
};

export const validatePatch = (req, res, next) => {
  const { body } = req;
  if (!body.name && !body.email) {
    return res
      .status(400)
      .json({ message: "Campo name ou email é obrigatório" });
  }
  if (body.name === "" && body.email === "") {
    return res
      .status(400)
      .json({ message: "Campo name ou email não pode ser vazio" });
  }
  next();
};

export const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Campo id é obrigatório" });
  }
  if (id === "") {
    return res.status(400).json({ message: "Campo id não pode ser vazio" });
  }
  next();
};
