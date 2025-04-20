# 📚 Guia de Express.js

Este guia explica como usar o Express.js para criar APIs com rotas, middlewares, leitura de corpo (body), CORS e organização em arquivos.

---

## 📦 Instalação

```bash
npm init -y
npm install express cors
```

---

## 📁 Estrutura de Arquivos Sugerida

```
meu-projeto/
│
├── app.js          # Configuração do app
├── router.js       # Arquivo de rotas
└── server.js       # Arquivo que inicia o servidor
```

---

## 🚀 Iniciando com Express

### `app.js`

```js
const express = require("express");
const cors = require("cors");
const router = require("./router");

const app = express();

// Middlewares
app.use(express.json()); // Habilita JSON no body
app.use(cors()); // Libera CORS
app.use(router); // Usa as rotas

module.exports = app;
```

---

### `server.js`

```js
const app = require("./app");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

---

### `router.js`

```js
const express = require("express");
const router = express.Router();

// Rota GET simples
router.get("/", (req, res) => {
  res.send("API está online!");
});

// Rota POST com acesso ao corpo da requisição
router.post("/dados", (req, res) => {
  const { nome, idade } = req.body;
  res.json({ mensagem: `Recebido: ${nome}, ${idade} anos` });
});

module.exports = router;
```

---

## 🔍 Acessando o corpo (body) da requisição

Para receber dados via `POST`, `PUT`, etc., você usa o middleware `express.json()`:

```js
app.use(express.json());
```

E depois acessa assim:

```js
req.body.nome;
req.body.idade;
```

---

## 🌐 Lidando com CORS

```js
const cors = require("cors");
app.use(cors());
```

Se quiser liberar apenas para um domínio específico:

```js
app.use(cors({ origin: "https://meusite.com" }));
```

---

## ➕ Outros Métodos HTTP

```js
// PUT
router.put("/usuario/:id", (req, res) => {
  const { id } = req.params;
  const dados = req.body;
  res.json({ id, atualizado: dados });
});

// DELETE
router.delete("/usuario/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Usuário com id ${id} deletado`);
});
```

---

## 📎 Acessando parâmetros da URL

```js
router.get("/usuario/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Usuário de ID: ${id}`);
});
```

---

## 📥 Acessando query strings

```js
// /buscar?nome=diego
router.get("/buscar", (req, res) => {
  const nome = req.query.nome;
  res.send(`Buscando por ${nome}`);
});
```

---

## 🧪 Testando com Insomnia/Postman

- Faça uma requisição `POST` para `/dados` com o corpo:

```json
{
  "nome": "Diego",
  "idade": 18
}
```

- A resposta será:

```json
{
  "mensagem": "Recebido: Diego, 18 anos"
}
```

---

## 🧼 Boas práticas

- Separe as rotas em arquivos próprios.
- Use middlewares para validações, autenticação, etc.
- Documente sua API (ex: com Swagger).
- Use `.env` para configurações sensíveis (como senhas ou portas).
- Use `try/catch` para capturar erros.

---
