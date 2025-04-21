import client from "./database.js";

const db = async () => {
  await client.connect();
  console.log("🔌 Conectado ao banco de dados PostgreSQL.");
};

db().catch((err) =>
  console.error("❌ Erro ao conectar ao banco de dados:", err)
);

async function criarTabelaSeNaoExistir() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS usuario (
      id SERIAL PRIMARY KEY,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    )
  `);
  console.log("✅ Tabela 'usuario' pronta.");
}

async function inserirUsuario(nome, email, senha) {
  const res = await client.query(
    "INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
    [nome, email, senha]
  );
  console.log("✅ Usuário inserido:", res.rows[0]);
  return res.rows[0];
}

async function buscarUsuarioPorEmail(email) {
  const res = await client.query("SELECT * FROM usuario WHERE email = $1", [
    email,
  ]);
  if (res.rows.length > 0) {
    console.log("🔎 Usuário encontrado:", res.rows[0]);
    return res.rows[0];
  } else {
    console.log("❌ Nenhum usuário com esse email:", email);
  }
}

async function deletarUsuario(id) {
  const res = await client.query(
    "DELETE FROM usuario WHERE id = $1 RETURNING *",
    [id]
  );
  if (res.rows.length > 0) {
    console.log("🗑️ Usuário deletado:", res.rows[0]);
  } else {
    console.log("❌ Nenhum usuário encontrado com ID:", id);
  }
}

async function listarTodosUsuarios() {
  const res = await client.query("SELECT * FROM usuario");
  console.log("📋 Todos os usuários:");
  console.table(res.rows);
}

async function atualizarUsuario(id, nome, email, senha) {
  const res = await client.query(
    `UPDATE usuario SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *`,
    [nome, email, senha, id]
  );
  if (res.rows.length > 0) {
    console.log("✏️ Usuário atualizado:", res.rows[0]);
    return res.rows[0];
  } else {
    console.log("❌ Nenhum usuário encontrado com esse ID:", id);
  }
}

async function rodarTestes() {
  try {
    await criarTabelaSeNaoExistir();

    // Inserir um novo usuário
    const user = await inserirUsuario(
      "Diego Dev",
      "diego@ifrs.edu.br",
      "123456"
    );

    // Buscar o usuário pelo email
    await buscarUsuarioPorEmail("diego@ifrs.edu.br");

    // Atualizar o usuário
    await atualizarUsuario(
      user.id,
      "Diego Developer",
      "diego.dev@ifrs.edu.br",
      "newpassword"
    );

    // Listar todos os usuários
    await listarTodosUsuarios();

    // Deletar o usuário
    await deletarUsuario(user.id);
    await listarTodosUsuarios();

    // Encerrar a conexão
    await client.end();
    console.log("🔌 Conexão encerrada.");
  } catch (err) {
    console.error("❌ Erro nos testes:", err);
  }
}

rodarTestes();
