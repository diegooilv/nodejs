# pg

Este projeto é uma aplicação simples para testar a conexão e manipulação de dados usando o módulo `pg` com um banco de dados PostgreSQL.

## Estrutura do Projeto

Abaixo estão os principais arquivos e pastas do projeto:

- **[src/](src/)**: Pasta principal contendo o código-fonte do projeto.
  - **[models/user.js](src/models/user.js)**: Contém o modelo (ou _data access layer_, DAL) responsável por realizar as operações CRUD (Create, Read, Update, Delete) no banco de dados para o recurso "usuário". Este modelo lida com a inserção, busca e deleção de usuários.
  - **[database.js](src/database.js)**: Configura e gerencia a conexão com o banco de dados PostgreSQL.
  - **[app.js](src/app.js)**: Um aplicativo simples utilizado para testar a conexão e as funcionalidades do modelo, como inserção e busca de usuários.

## Funcionalidades

- **Conexão com PostgreSQL**: Através de `pg`, este projeto estabelece uma conexão com um banco de dados PostgreSQL para realizar operações de banco de dados.
- **Modelo de Usuário**: Um modelo que contém funções para:
  - Inserir um novo usuário no banco.
  - Buscar um usuário pelo email.
  - Deletar um usuário pelo id.
- **Teste de Conexão**: A aplicação permite testar a conexão ao banco de dados e realizar operações de teste diretamente.

## Observações

- **Data Access Layer (DAL)**: O arquivo `user.js` é um exemplo de _data access layer_ (DAL), que encapsula a lógica de acesso aos dados e permite que o código interaja com o banco de dados de maneira organizada.
- **Projeto Simples**: Este é um projeto simples realizado no dia 21/04/25 para demonstrar a conexão e manipulação de dados usando PostgreSQL com o `pg`.
