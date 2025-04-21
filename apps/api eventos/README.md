# API de Eventos

Esta é uma API para gerenciar usuários e eventos. Ela permite o cadastro, login de usuários e gerenciamento de eventos, incluindo a criação, atualização, exclusão e listagem de eventos. A API usa o framework Express e utiliza middlewares de autenticação e autorização para proteger rotas sensíveis.

## Tecnologias

- Node.js
- Express
- MongoDB
- Mongoose

## Rotas

### 1. **Usuários**

#### 1.1. **Registrar Usuário**

- **Método**: `POST`
- **Rota**: `/registrar`
- **Descrição**: Registra um novo usuário. Você precisa enviar os campos `name`, `email` e `password`.
- **Exemplo de corpo da requisição**:
  ```json
  {
    "name": "João",
    "email": "joao@example.com",
    "password": "senha123"
  }
  ```

#### 1.2. **Login do Usuário**

- **Método**: `POST`
- **Rota**: `/login`
- **Descrição**: Realiza o login de um usuário. Você precisa enviar os campos `email` e `password`. Em caso de sucesso, será retornado um token JWT.
- **Exemplo de corpo da requisição**:
  ```json
  {
    "email": "joao@example.com",
    "password": "senha123"
  }
  ```

#### 1.3. **Verificar Usuário Logado**

- **Método**: `GET`
- **Rota**: `/me`
- **Descrição**: Retorna as informações do usuário logado, a partir do token JWT. O token deve ser enviado no cabeçalho `Authorization`.
- **Exemplo de cabeçalho da requisição**:
  ```
  Authorization: Bearer <token_jwt>
  ```

### 2. **Eventos**

#### 2.1. **Listar Eventos**

- **Método**: `GET`
- **Rota**: `/eventos`
- **Descrição**: Retorna uma lista de eventos. Você pode filtrar os eventos por `categoria`, `data` ou `local` no corpo da requisição.
- **Exemplo de corpo da requisição**:
  ```json
  {
    "categoria": "Música"
  }
  ```

#### 2.2. **Listar Evento por ID**

- **Método**: `GET`
- **Rota**: `/eventos/:id`
- **Descrição**: Retorna as informações de um evento específico, baseado no ID.
- **Exemplo de URL**:
  ```
  /eventos/60c72b2f9f1b2c0015c5a0d3
  ```

#### 2.3. **Criar Evento**

- **Método**: `POST`
- **Rota**: `/eventos`
- **Descrição**: Cria um novo evento. É necessário que o usuário esteja logado, e o token JWT deve ser enviado no cabeçalho `Authorization`.
- **Exemplo de corpo da requisição**:
  ```json
  {
    "categoria": "Música",
    "data": "2025-04-25T19:00:00Z",
    "local": "Estádio"
  }
  ```

#### 2.4. **Deletar Evento**

- **Método**: `DELETE`
- **Rota**: `/eventos/:id`
- **Descrição**: Deleta um evento específico, com base no ID. O usuário precisa ser o dono do evento, que será verificado pelo middleware de autorização.
- **Exemplo de URL**:
  ```
  /eventos/60c72b2f9f1b2c0015c5a0d3
  ```

#### 2.5. **Atualizar Evento**

- **Método**: `PUT`
- **Rota**: `/eventos/:id`
- **Descrição**: Atualiza um evento existente. O usuário precisa ser o dono do evento, e o token JWT deve ser enviado no cabeçalho `Authorization`.
- **Exemplo de corpo da requisição**:
  ```json
  {
    "categoria": "Teatro",
    "data": "2025-04-30T20:00:00Z",
    "local": "Teatro Municipal"
  }
  ```

## Middleware

### 1. **Verificar Login**

O middleware `userMiddleware.verificarLogin` verifica se o usuário está autenticado. Ele é usado nas rotas que requerem um token JWT válido.

### 2. **Verificar Dono do Evento**

O middleware `eventoMiddleware.verificarDono` verifica se o usuário autenticado é o dono do evento antes de permitir a atualização ou exclusão do evento.

## Exemplo de uso com cURL

### 1. **Registrar Usuário**

```bash
curl -X POST http://localhost:3000/registrar \
  -H "Content-Type: application/json" \
  -d '{"name": "João", "email": "joao@example.com", "password": "senha123"}'
```

### 2. **Login de Usuário**

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email": "joao@example.com", "password": "senha123"}'
```

### 3. **Listar Eventos**

```bash
curl -X GET http://localhost:3000/eventos \
  -H "Content-Type: application/json" \
  -d '{"categoria": "Música"}'
```

### 4. **Criar Evento (com Token JWT)**

```bash
curl -X POST http://localhost:3000/eventos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_jwt>" \
  -d '{"categoria": "Música", "data": "2025-04-25T19:00:00Z", "local": "Estádio"}'
```

## Instalação

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <diretório_do_repositório>
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm start
   ```
