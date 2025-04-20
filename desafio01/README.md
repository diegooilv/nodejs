# 🚀 Desafio 01 - Conceitos do Node.js

## 💻 Sobre o desafio

Nesse desafio, você deverá criar uma aplicação para treinar o que aprendeu até agora no Node.js!

Essa será uma aplicação para gerenciar tarefas (em inglês _todos_). Será permitida a criação de um usuário com `name` e `username`, bem como fazer o **CRUD** de _todos_:

- Criar um novo todo;
- Listar todos os todos;
- Alterar o `title` e `deadline` de um todo existente;
- Marcar um todo como feito;
- Excluir um todo;

Tudo isso para cada usuário em específico (o `username` será passado pelo **header**).

---

## 🧪 Run in Insomnia

---

## 📌 Rotas da aplicação

Com o template já clonado e o arquivo `index.js` aberto, você deve completar onde não possui código para atingir os objetivos de cada teste.

### POST /users

A rota deve receber `name` e `username` no corpo da requisição. O novo usuário deve ser armazenado no seguinte formato:

```json
{
  "id": "uuid",
  "name": "Danilo Vieira",
  "username": "danilo",
  "todos": []
}
```

- O `id` deve ser um UUID.
- A lista `todos` deve iniciar vazia.
- Retorne o usuário criado no corpo da resposta com status `201`.

---

### GET /todos

- Deve receber, no header da requisição, uma propriedade `username`.
- Retornar a lista de todos do usuário.

---

### POST /todos

- Deve receber `title` e `deadline` no corpo da requisição.
- O `username` deve estar no header.
- O todo deve ter o formato:

```json
{
  "id": "uuid",
  "title": "Nome da tarefa",
  "done": false,
  "deadline": "2021-02-27T00:00:00.000Z",
  "created_at": "2021-02-22T00:00:00.000Z"
}
```

- Use `new Date(deadline)` para transformar a string de data.
- Retorne o todo criado com status `201`.

---

### PUT /todos/:id

- Receber `username` no header e `title`, `deadline` no corpo.
- Atualizar apenas `title` e `deadline` do `todo` com o `id` informado.

---

### PATCH /todos/:id/done

- Receber `username` no header.
- Marcar o todo como `done: true`.

---

### DELETE /todos/:id

- Receber `username` no header.
- Excluir o `todo` com `id` informado.
- Retornar status `204`.

---

## 🧪 Especificação dos testes

### Testes de usuários

- **Should be able to create a new user**

  Crie um usuário e retorne um JSON com o usuário criado e status `201`.

- **Should not be able to create a new user when username already exists**

  Retornar `400` com JSON:

  ```json
  {
    "error": "Mensagem do erro"
  }
  ```

---

## Docs

Esta API permite gerenciar usuários e suas tarefas (_todos_). Todas as respostas usam JSON e o servidor roda em `http://localhost:3333`.

## Autenticação por Header

Algumas rotas exigem que o `username` seja enviado no header da requisição:

```
username: <string>
```

## Rotas de Usuário

### GET `/users`

Retorna a lista de usuários cadastrados. Pode receber um parâmetro de busca opcional.

- **Headers**: nenhum
- **Query String** (opcional):
  - `search` — filtra usuários por `name` ou `username` que contenham o termo.
- **Response**:
  - `200 OK` + `[{ id, name, username, todos }]`

```http
GET /users?search=diego HTTP/1.1
Host: localhost:3333
```

```json
[
  {
    "id": "uuid-do-usuario",
    "name": "Diego",
    "username": "diego123",
    "todos": []
  }
]
```

### POST `/users`

Cria um novo usuário.

- **Headers**: nenhum
- **Body** (JSON):
  ```json
  {
    "name": "Diego",
    "username": "diego123"
  }
  ```
- **Response**:
  - `201 Created` + objeto do usuário criado
  - `400 Bad Request` se faltar `name` ou `username`, ou se o `username` já existir.

```http
POST /users HTTP/1.1
Host: localhost:3333
Content-Type: application/json

{ "name": "Diego", "username": "diego123" }
```

```json
{
  "id": "uuid-gerado",
  "name": "Diego",
  "username": "diego123",
  "todos": []
}
```

## Rotas de Tarefas (Todos)

> **Importante**: todas as rotas abaixo exigem o header `username: <string>` para identificar o usuário.

### POST `/todos`

Cria uma nova tarefa para o usuário.

- **Headers**:
  ```http
  username: diego123
  Content-Type: application/json
  ```
- **Body** (JSON):
  ```json
  {
    "title": "Estudar Node.js",
    "deadline": "2025-05-01"
  }
  ```
- **Response**:
  - `201 Created` + objeto da tarefa criada
  - `400 Bad Request` se faltar `title`, `deadline` ou `username`
  - `404 Not Found` se o `username` não existir

```json
{
  "id": "uuid-tarefa",
  "title": "Estudar Node.js",
  "done": false,
  "deadline": "2025-05-01T00:00:00.000Z",
  "created_at": "2025-04-20T14:00:00.000Z"
}
```

### GET `/todos`

Lista todas as tarefas do usuário.

- **Headers**:
  ```http
  username: diego123
  ```
- **Response**:
  - `200 OK` + `[ { id, title, done, deadline, created_at } ]`
  - `404 Not Found` se o `username` não existir

### PUT `/todos/:id`

Atualiza `title` e `deadline` de uma tarefa existente.

- **Headers**:
  ```http
  username: diego123
  Content-Type: application/json
  ```
- **Params**:
  - `:id` — ID da tarefa
- **Body** (JSON):
  ```json
  {
    "title": "Estudar Express.js",
    "deadline": "2025-05-10"
  }
  ```
- **Response**:
  - `200 OK` + objeto da tarefa atualizada
  - `400 Bad Request` se faltar `title` ou `deadline`
  - `404 Not Found` se não encontrar a tarefa

```json
{
  "id": "uuid-tarefa",
  "title": "Estudar Express.js",
  "done": false,
  "deadline": "2025-05-10T00:00:00.000Z",
  "created_at": "2025-04-20T14:00:00.000Z"
}
```

### PATCH `/todos/:id/done`

Marca uma tarefa como feita (`done: true`).

- **Headers**:
  ```http
  username: diego123
  ```
- **Params**:
  - `:id` — ID da tarefa
- **Response**:
  - `204 No Content` (sem corpo)
  - `404 Not Found` se não encontrar a tarefa

### DELETE `/todos/:id`

Remove uma tarefa.

- **Headers**:
  ```http
  username: diego123
  ```
- **Params**:
  - `:id` — ID da tarefa
- **Response**:
  - `204 No Content` (sem corpo)
  - `404 Not Found` se não encontrar a tarefa

> Esta API foi desenvolvida utilizando Node.js puro, sem o uso de frameworks externos.
