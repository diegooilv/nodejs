# Tipos de Parâmetros em Requisições HTTP

No desenvolvimento de APIs, especialmente com Node.js e frameworks como Express, é comum lidar com três tipos principais de parâmetros em uma requisição:

---

## 1. Parâmetros de Rota (Route Parameters)

### 📌 O que são? (Query Parameters)

São parte fixa da URL, usados geralmente para identificar recursos específicos.

### 🧪 Exemplo de Parâmetros de Rota

```http
GET /users/:id
```

### 🌐 Exemplo real

```http
/users/123
```

### 📥 Como acessar os Query Parameters no Express

```js
req.params.id; // "123"
```

---

## 2. Parâmetros de Consulta (Query Parameters)

### 📌 O que são?

São passados após o símbolo `?` na URL. São usados para filtros, buscas, paginação, ordenação etc.

### 🧪 Exemplo

```url
/users?name=diego&age=20
```

### 📥 Como acessar os Route Parameters no Express

```js
req.query.name; // "diego"
req.query.age; // "20"
```

---

## 3. Corpo da Requisição (Body)

### 📌 O que é?

O body é usado para enviar dados estruturados (como JSON) em métodos como `POST`, `PUT` ou `PATCH`.

### 🧪 Exemplo de corpo (JSON)

```json
{
  "name": "Diego",
  "email": "diego@email.com"
}
```

### 📥 Como acessar no Express

```js
req.body.name; // "Diego"
req.body.email; // "diego@email.com"
```

> ⚠️ Para acessar o `body`, é necessário usar o middleware `express.json()`:

```js
app.use(express.json());
```

---

## ✅ Resumo

| Tipo             | Onde aparece?                  | Quando usar?                      |
| ---------------- | ------------------------------ | --------------------------------- |
| **Route Params** | `/users/:id`                   | Identificar um recurso específico |
| **Query Params** | `/users?age=20&country=br`     | Filtrar, buscar, ordenar          |
| **Body**         | Enviado no corpo da requisição | Criar ou atualizar algo           |

---

## 💡 Dica Extra

Combine os três tipos quando necessário!  
Exemplo:

```http
PUT /users/:id?notify=true
Body: { "name": "Diego" }
```
