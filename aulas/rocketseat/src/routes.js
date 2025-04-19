import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutesPath } from "./utils/build-routes-path.js";
import path from "node:path";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutesPath("/users"),
    handler: (req, res) => {
      const { search } = req.query;
      console.log(search);
      const users = database.select(
        "users",
        search
          ? {
              name: search,
              email: search,
            }
          : null
      );

      return res.writeHead(200).end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutesPath("/users"),
    handler: (req, res) => {
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
      const user = { id: randomUUID(), name: name, email: email };
      database.insert("users", user);
      return res.writeHead(201).end("Usuario criado com sucesso");
    },
  },
  {
    method: "DELETE",
    path: buildRoutesPath("/users/:id"),
    handler: (req, res) => {
      const id = req.params.id;
      database.delete("users", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutesPath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;
      database.update("users", id, { name, email });

      return res.writeHead(204).end();
    },
  },
];
