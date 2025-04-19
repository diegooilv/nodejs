import http from "node:http";

const users = [];
const server = http.createServer(async (req, res) => {
  // Const method = req.method;
  // Const url = req.url;
  const { method, url } = req;
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
    console.log(chunk.toString());
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  console.log(method, url);

  if (method === "GET" && url === "/users") {
    console.log("GET /users", users);
    return res
      .setHeader("Content-Type", "application/json")
      .writeHead(200)
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
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

    users.push({ name: name, email: email });
    return res.writeHead(201).end("Usuario criado com sucesso");
  }

  res.writeHead(404).end("Página não encontrada");
});

server.listen(3333);

// http://localhost:3333/
