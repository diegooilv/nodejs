import http from "node:http";
import { json } from "./middleware/json.js";
import { Database } from "./database.js";
import { randomUUID } from "node:crypto";


const database = new Database();
const server = http.createServer(async (req, res) => {
  // Const method = req.method;
  // Const url = req.url;
  const { method, url } = req;
  
  await json(req, res);

  console.log(method, url);

  if (method === "GET" && url === "/users") {
    const users = database.select("users");
    console.log("GET /users", users);
    return res
      .writeHead(200)
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const users = database.select("users");
    const { name, email } = req.body;
    if (!name || !email) {
      return res.writeHead(400).end("Nome e email são obrigatórios");
    }
    const userAlreadyExists = users.some((user) => user.email === email);
    if (userAlreadyExists) {
      return res.writeHead(409).end("Email já cadastrado");
    }
    if (name.length < 3) {
      return res.writeHead(400).end("Nome deve ter mais de 3 caracteres");
    }
    if (email.length < 5) {
      return res.writeHead(400).end("Email deve ter mais de 5 caracteres");
    }
    if (!email.includes("@")) {
      return res.writeHead(400).end("Email deve conter @");
    }

    // RandomUUID é uma função que gera um ID único
    // O ID é gerado com base em um algoritmo que garante que o ID seja único
    const user = { id: randomUUID() ,name: name, email: email };
    database.insert("users", user);
    return res.writeHead(201).end("Usuario criado com sucesso");
  }

  res.writeHead(404).end("Página não encontrada");
});

server.listen(3333);

// http://localhost:3333/
