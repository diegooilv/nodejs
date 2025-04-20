# Express: `params`, `body`, e `query`

### 1. **Params**

`params` são usados para capturar variáveis na URL, geralmente usadas em rotas dinâmicas, como identificadores de recurso (por exemplo, IDs de usuário ou tarefas).

#### Exemplo de URL:

```
GET /user/123
```

#### Código:

```js
// Rota para pegar usuário por ID
app.get("/user/:id", (req, res) => {
  const userId = req.params.id; // Aqui, 'id' é capturado de :id
  res.send(`O ID do usuário é: ${userId}`);
});
```

### 2. **Body**

`body` é usado para capturar os dados enviados no corpo da requisição, geralmente em requisições `POST`, `PUT` ou `PATCH`. Esses dados são enviados no formato JSON, form data, ou outro formato.

#### Exemplo de URL:

```
POST /user
```

#### Exemplo de Corpo (JSON):

```json
{
  "name": "Diego",
  "email": "diego@example.com"
}
```

#### Código:

```js
// Rota para criar um novo usuário
app.post("/user", (req, res) => {
  const { name, email } = req.body; // Dados enviados no corpo da requisição
  res.send(`Nome: ${name}, Email: ${email}`);
});
```

### 3. **Query**

`query` é usado para capturar parâmetros passados na URL após o símbolo `?`. Esses parâmetros são geralmente usados em filtros ou paginação.

#### Exemplo de URL:

```
GET /user?age=25&city=NewYork
```

#### Código:

```js
// Rota para filtrar usuários por parâmetros de query
app.get("/user", (req, res) => {
  const { age, city } = req.query; // Captura 'age' e 'city' dos parâmetros de query
  res.send(`Idade: ${age}, Cidade: ${city}`);
});
```

---

### Resumo dos Tipos:

- **`params`**: Para capturar valores diretamente na URL (ex: `/user/:id`).
- **`body`**: Para capturar dados enviados no corpo da requisição (ex: `POST`, `PUT`).
- **`query`**: Para capturar parâmetros passados na URL após o `?` (ex: `/user?age=25&city=NewYork`).
