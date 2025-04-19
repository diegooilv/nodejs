# 🧩 Middlewares

## O que são Middlewares?

Middlewares são funções que **interceptam** a requisição (request) no servidor antes de ela chegar ao destino final (geralmente a rota). Elas podem **modificar** a requisição ou a resposta, **fazer validações**, **logar** ou até **bloquear** o fluxo da requisição.

> **Middleware** = "Intermediário" entre a requisição e o processamento final.

---

## 🛣 Como funciona?

Em **Node.js puro**, não existe uma estrutura como o `app.use()` do Express para registrar middlewares. Porém, podemos **simular** essa funcionalidade utilizando o método `http.createServer()` e gerenciando manualmente a cadeia de middlewares.

---

## ✨ Estrutura básica de um middleware

### Exemplo simples

```js
import http from "node:http";

const server = http.createServer((req, res) => {
  middleware1(req, res, () => {
    middleware2(req, res, () => {
      // Aqui vai o código da rota
      res.end("Requisição processada com sucesso!");
    });
  });
});

server.listen(3333);
```

---

## 🔧 Implementando middlewares manualmente

### 1. **Middleware de Log**

Esse middleware registra o método e a URL de cada requisição que chega no servidor:

```js
function logRequest(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); // Passa para o próximo middleware ou rota
}
```

### 2. **Middleware de Autenticação**

Verifica se o usuário está autenticado antes de acessar certas rotas:

```js
function checkAuth(req, res, next) {
  const token = req.headers["authorization"];
  if (!token || token !== "12345") {
    return res.writeHead(401).end("Acesso não autorizado");
  }
  next(); // Usuário autenticado, passa para o próximo middleware
}
```

### 3. **Middleware de Tratamento de Erros**

Este middleware vai tratar qualquer erro que acontecer no fluxo:

```js
function errorHandler(err, req, res, next) {
  console.error(err);
  res.writeHead(500).end("Erro interno do servidor");
}
```

---

## 🚧 Como encadear middlewares no Node.js?

Podemos usar o `next()` para encadear middlewares. O `next()` passa a execução para o próximo middleware na fila. Caso não seja chamado, o fluxo é interrompido.

### Exemplo de Encadeamento

```js
import http from "node:http";

const server = http.createServer((req, res) => {
  logRequest(req, res, () => {
    // Chama o middleware de log
    checkAuth(req, res, () => {
      // Chama o middleware de autenticação
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Autenticado com sucesso!");
    });
  });
});

server.listen(3333);
```

---

## ⚡ Middlewares para manipulação de corpo de requisição (JSON)

Um exemplo clássico é um middleware que parseia o corpo das requisições em JSON:

```js
function parseJson(req, res, next) {
  const buffers = [];
  req.on("data", (chunk) => buffers.push(chunk)); // Recebe os chunks
  req.on("end", () => {
    try {
      req.body = JSON.parse(Buffer.concat(buffers).toString());
      next(); // Passa para o próximo middleware
    } catch (err) {
      res.writeHead(400).end("JSON inválido");
    }
  });
}
```

---

## 🌍 Utilizando middlewares em rotas específicas

Ao invés de usar middlewares globalmente, você pode escolher quais rotas precisam de middlewares específicos.

### Exemplo

```js
function logRequest(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

const server = http.createServer((req, res) => {
  if (req.url === "/users") {
    logRequest(req, res, () => {
      res.end("Usuários");
    });
  } else {
    res.writeHead(404).end("Página não encontrada");
  }
});

server.listen(3333);
```

---

## ⚠️ Como evitar múltiplas respostas?

Em middlewares, é muito importante evitar **responder mais de uma vez**. Caso isso aconteça, o servidor irá gerar um erro.

- **Nunca chame** `res.end()` ou `res.writeHead()` várias vezes. Isso interrompe o fluxo de requisições.

---

## 🚀 Exemplos Práticos

### 1. Middleware de log

```js
function logRequest(req, res, next) {
  console.log(`Método: ${req.method}, URL: ${req.url}`);
  next(); // Passa para o próximo middleware ou rota
}
```

### 2. Middleware de tratamento de erros

```js
function errorHandler(err, req, res, next) {
  console.error(err);
  res.writeHead(500).end("Erro no servidor");
}
```

### 3. Middleware para JSON

```js
function json(req, res, next) {
  const buffers = [];
  req.on("data", (chunk) => buffers.push(chunk));
  req.on("end", () => {
    try {
      req.body = JSON.parse(Buffer.concat(buffers).toString());
      next(); // Passa para o próximo middleware
    } catch (err) {
      res.writeHead(400).end("JSON inválido");
    }
  });
}
```

---

## 📜 Conclusão

Middlewares são funções poderosas e essenciais para gerenciar o fluxo de requisições em Node.js.

Esses middlewares podem ser usados para:

- **Logar** informações sobre a requisição
- **Validar** dados ou autenticar usuários
- **Parsear** dados (como JSON)
- **Tratar erros** e muito mais

Lembre-se de sempre chamar `next()` nos middlewares para garantir que o fluxo continue corretamente.

---

## 🚨 Referências

- [Documentação oficial do Node.js - http](https://nodejs.org/api/http.html)
- [Entendendo Middlewares no Express](https://expressjs.com/en/guide/using-middleware.html)
