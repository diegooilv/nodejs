## 📦 Usando PostgreSQL com Node.js (`pg`)

Este guia mostra como usar a biblioteca `pg` para se conectar a um banco PostgreSQL e executar comandos básicos: inserir, buscar, atualizar e deletar dados.

### ✅ Requisitos

- Node.js instalado
- PostgreSQL rodando localmente ou via servidor (ex: [ElephantSQL](https://www.elephantsql.com/))
- Um banco de dados criado

---

## 🛠️ Instalação

```bash
npm install pg
```

---

## 🔌 Conectando ao banco

```js
const { Client } = require("pg");

const client = new Client({
  user: "seu_usuario",
  host: "localhost",
  database: "nome_do_banco",
  password: "sua_senha",
  port: 5432,
});

client
  .connect()
  .then(() => console.log("Conectado ao PostgreSQL"))
  .catch((err) => console.error("Erro na conexão", err));
```

---

## 📄 Criando uma tabela (ex: usuários)

```js
const query = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  );
`;

client
  .query(query)
  .then((res) => console.log("Tabela criada"))
  .catch((err) => console.error("Erro ao criar tabela", err));
```

---

## 💾 Inserindo dados

```js
const inserirUsuario = async (nome, email) => {
  try {
    const res = await client.query(
      "INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *",
      [nome, email]
    );
    console.log("Usuário inserido:", res.rows[0]);
  } catch (err) {
    console.error("Erro ao inserir usuário:", err);
  }
};

// Exemplo:
inserirUsuario("Diego", "diego@example.com");
```

---

## 🔍 Buscando dados

### Buscar todos:

```js
const buscarTodos = async () => {
  const res = await client.query("SELECT * FROM usuarios");
  console.log(res.rows);
};

buscarTodos();
```

### Buscar por ID:

```js
const buscarPorId = async (id) => {
  const res = await client.query("SELECT * FROM usuarios WHERE id = $1", [id]);
  console.log(res.rows[0]);
};

buscarPorId(1);
```

---

## ✏️ Atualizando dados

```js
const atualizarUsuario = async (id, novoNome, novoEmail) => {
  const res = await client.query(
    "UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING *",
    [novoNome, novoEmail, id]
  );
  console.log("Usuário atualizado:", res.rows[0]);
};

atualizarUsuario(1, "Diego Atualizado", "novoemail@example.com");
```

---

## ❌ Removendo dados

```js
const deletarUsuario = async (id) => {
  const res = await client.query(
    "DELETE FROM usuarios WHERE id = $1 RETURNING *",
    [id]
  );
  console.log("Usuário removido:", res.rows[0]);
};

deletarUsuario(1);
```

---

## 🧼 Fechando a conexão

```js
client
  .end()
  .then(() => console.log("Conexão encerrada"))
  .catch((err) => console.error("Erro ao encerrar conexão", err));
```

---

## 📚 Extras

- `res.rows` → retorna um array com os resultados da consulta
- `RETURNING *` → retorna os dados inseridos/atualizados/deletados
- `$1, $2, ...` → placeholders para evitar SQL Injection (safe!)

Se quiser, posso transformar isso em um repo base com todos os arquivos já prontos pra usar. Quer que eu gere esse projeto inicial pra ti?
