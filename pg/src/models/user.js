import client from "../database.js";

const user = {
  insertUser: async (nome, email, senha) => {
    try {
      const res = await client.query(
        "INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
        [nome, email, senha]
      );
      console.log("User inserted:", res.rows[0]);
      return;
    } catch (err) {
      console.error("Erro::", err);
    }
  },

  buscarUsuarioPorEmail: async (email) => {
    try {
      const res = await client.query("SELECT * FROM usuario WHERE email = $1", [
        email,
      ]);
      if (res.rows.length > 0) {
        console.log("Usuario:", res.rows[0]);
        return res.rows[0];
      }
      console.log("Nenhum usuario com esse email:", email);
    } catch (err) {
      console.error("Erro:", err);
    }
  },

  deletarUsuario: async (id) => {
    try {
      const res = await client.query(
        "DELETE FROM usuario WHERE id = $1 RETURNING *",
        [id]
      );
      if (res.rows.length > 0) {
        console.log("Usuario deletado:", res.rows[0]);
        return res.rows[0];
      } else {
        console.log("Nenhum usuario encontrado com esse id:", id);
      }
    } catch (err) {
      console.error("Erro:", err);
    }
  },

  atualizarUsuario: async (id, nome, email, senha) => {
    try {
      const res = await client.query(
        "UPDATE usuario SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *",
        [nome, email, senha, id]
      );
      if (res.rows.length > 0) {
        console.log("Usuario atualizado:", res.rows[0]);
        return res.rows[0];
      } else {
        console.log("Nenhum usuario encontrado com esse id:", id);
      }
    } catch (err) {
      console.error("Erro:", err);
    }
  },
};

export default user;
