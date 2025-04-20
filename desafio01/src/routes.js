import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutesPath } from "./utils/build-rotes-patch.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutesPath("/users"),
    handler(req, res) {
      const { search } = req.query;
      const usuarios = database.selecionar(
        "users",
        search ? { name: search, username: search } : null
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(usuarios));
    },
  },
  {
    method: "POST",
    path: buildRoutesPath("/users"),
    handler(req, res) {
      const { name, username } = req.body;
      if (!name || !username) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Preencha todos os campos" }));
      }
      const existe = database.selecionar("users", { username }).length > 0;
      if (existe) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Usuário já existe" }));
      }
      const usuario = {
        id: randomUUID(),
        name,
        username,
        todos: [],
      };
      database.inserir("users", usuario);
      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(usuario));
    },
  },
  {
    method: "POST",
    path: buildRoutesPath("/todos"),
    handler(req, res) {
      const username = req.headers["username"];
      const { title, deadline } = req.body;
      if (!username || !title || !deadline) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Preencha todos os campos" }));
      }
      const [usuario] = database.selecionar("users", { username });
      if (!usuario) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Usuário não encontrado" }));
      }
      const tarefa = {
        id: randomUUID(),
        title,
        done: false,
        deadline: new Date(deadline),
        created_at: new Date(),
      };
      const novosTodos = [...usuario.todos, tarefa];
      database.atualizar("users", usuario.id, {
        ...usuario,
        todos: novosTodos,
      });
      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(tarefa));
    },
  },
  {
    method: "PUT",
    path: buildRoutesPath("/todos/:id"),
    handler(req, res) {
      const { title, deadline, username } = req.body;
      const { id } = req.params;
      if (!title || !deadline || !username) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Preencha title,deadline e username" })
        );
      }
      const usuarios = database.selecionar("users");
      const usuario = usuarios.find(
        (u) => Array.isArray(u.todos) && u.todos.some((t) => t.id === id)
      );
      if (!usuario) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Tarefa não encontrada" }));
      }
      const novosTodos = usuario.todos.map((t) =>
        t.id === id ? { ...t, title, deadline: new Date(deadline) } : t
      );
      database.atualizar("users", usuario.id, {
        ...usuario,
        username,
        todos: novosTodos,
      });
      const tarefaAtualizada = novosTodos.find((t) => t.id === id);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(tarefaAtualizada));
    },
  },
  {
    method: "PATCH",
    path: buildRoutesPath("/todos/:id/done"),
    handler(req, res) {
      const { id } = req.params;
      const usuarios = database.selecionar("users");
      const usuario = usuarios.find(
        (u) => Array.isArray(u.todos) && u.todos.some((t) => t.id === id)
      );
      if (!usuario) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Tarefa não encontrada" }));
      }
      const novosTodos = usuario.todos.map((t) =>
        t.id === id ? { ...t, done: true } : t
      );
      database.atualizar("users", usuario.id, {
        ...usuario,
        todos: novosTodos,
      });
      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutesPath("/todos/:id"),
    handler(req, res) {
      const { id } = req.params;
      const usuarios = database.selecionar("users");
      const usuario = usuarios.find(
        (u) => Array.isArray(u.todos) && u.todos.some((t) => t.id === id)
      );
      if (!usuario) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Tarefa não encontrada" }));
      }
      const novosTodos = usuario.todos.filter((t) => t.id !== id);
      database.atualizar("users", usuario.id, {
        ...usuario,
        todos: novosTodos,
      });
      res.writeHead(204);
      return res.end();
    },
  },
];
