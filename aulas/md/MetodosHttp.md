# ✅ **Métodos HTTP**

---

## 🔍 `GET`

- **Busca** um recurso do servidor.
- **Não altera nada.** Só lê.
- **Usado em:** consultas, páginas, APIs de leitura.

---

## 📝 `POST`

- **Cria** um novo recurso.
- Envia dados no corpo da requisição.
- **Usado em:** formulários, criação de usuários, uploads etc.

---

## 🛠️ `PUT`

- **Atualiza completamente** um recurso existente.
- Substitui tudo (mesmo os dados que não mudaram têm que ser reenviados).
- **Exemplo:** trocar todos os dados de um usuário.

---

## 🔧 `PATCH`

- **Atualiza parcialmente** um recurso.
- Só os campos enviados são alterados.
- **Mais leve** que o PUT quando só muda 1 ou 2 coisas.

---

## 🗑️ `DELETE`

- **Remove** um recurso.
- A operação é **destrutiva**.
- Pode ou não retornar algo (ex: confirmação da exclusão).

---

## 🧠 `HEAD`

- Igual ao `GET`, **mas só retorna os headers**, sem o corpo da resposta.
- Serve pra **verificar se um recurso existe** ou checar metadata (tipo tamanho).
- **Exemplo:** checar se uma imagem tá disponível.

---

## 📦 `OPTIONS`

- Informa quais métodos e operações são permitidos em um recurso.
- Muito usado no **CORS** (Cross-Origin Resource Sharing).
- **Exemplo:** navegador faz um OPTIONS antes de um POST pra ver se é permitido.

---

## 🧪 `TRACE`

- Faz um **loopback de teste** entre cliente e servidor.
- Retorna o que foi enviado, útil pra debug.
- **Quase nunca usado** em APIs REST, e pode ser desabilitado por segurança.

---

## 🔁 `CONNECT`

- Abre um **túnel TCP/IP** com o servidor.
- Usado principalmente em **proxies** e **HTTPS via HTTP**.
- **Exemplo real:** browsers usando proxies HTTP pra criar conexões seguras.

---

## 🌐 `PRI`

- Método **específico do HTTP/2**, usado durante a conexão inicial.
- **Não é usado em aplicações normais** (só na camada de protocolo mesmo).
- Pouco conhecido e quase invisível pro dev comum.

---

## 🧾 Resumo

| Método    | Ação                        | Corpo?   | Altera dados? | Usado pra                       |
| --------- | --------------------------- | -------- | ------------- | ------------------------------- |
| `GET`     | Buscar recurso              | ❌       | ❌            | Ler dados                       |
| `POST`    | Criar recurso               | ✅       | ✅            | Criar algo novo                 |
| `PUT`     | Atualizar recurso (total)   | ✅       | ✅            | Substituir tudo                 |
| `PATCH`   | Atualizar recurso (parcial) | ✅       | ✅            | Mudar só um campo               |
| `DELETE`  | Apagar recurso              | ❌ ou ✅ | ✅            | Excluir algo                    |
| `HEAD`    | Buscar headers              | ❌       | ❌            | Testar se existe, checar infos  |
| `OPTIONS` | Ver o que é permitido       | ❌       | ❌            | Pré-voo CORS, descobrir métodos |
| `TRACE`   | Loop de debug               | ❌       | ❌            | Depuração HTTP                  |
| `CONNECT` | Criar túnel TCP             | ❌       | ❌            | HTTPS por proxy                 |
| `PRI`     | Interno do HTTP/2           | ❌       | ❌            | Negociação HTTP/2 (não usamos)  |
