# Documentação Completa sobre `jsonwebtoken`

## O que é o `jsonwebtoken`?

O **jsonwebtoken** é uma biblioteca popular para trabalhar com **JSON Web Tokens (JWT)**. JWT é um formato compacto e seguro para transmitir informações entre duas partes como um objeto JSON. O token pode ser assinado, garantindo sua autenticidade, e também pode ser criptografado para garantir a confidencialidade.

## Instalação

Para instalar o `jsonwebtoken`, você pode usar o npm:

```bash
npm install jsonwebtoken
```

## Gerando um Token

Para gerar um token JWT, usamos o método `jwt.sign()`. Este método cria e assina um token com uma chave secreta.

### Exemplo de Geração de Token

```javascript
import jwt from "jsonwebtoken";

const SECRET_KEY = "sua_chave_secreta";

export function gerarToken(usuario) {
  return jwt.sign(
    { id: usuario._id, nome: usuario.nomeDeUsuario }, // Payload (dados que você quer armazenar no token)
    SECRET_KEY, // Chave secreta para assinar o token
    { expiresIn: "1h" } // Expiração do token (1 hora, no caso)
  );
}
```

### Explicação dos Parâmetros:

- **Payload**: Dados que você quer armazenar no token. Pode ser qualquer informação relevante, como o ID do usuário ou o nome.
- **SECRET_KEY**: Uma chave secreta usada para assinar o token. Deve ser mantida em segredo.
- **expiresIn**: Tempo de expiração do token (opcional). O token será inválido após esse período.

## Verificando um Token

Para verificar se um token é válido e não expirou, usamos o método `jwt.verify()`. Este método valida a assinatura e retorna o payload (dados armazenados no token) ou lança um erro caso o token seja inválido.

### Exemplo de Verificação de Token

```javascript
import jwt from "jsonwebtoken";

const SECRET_KEY = "sua_chave_secreta";

export function verificarToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verifica o token e retorna o payload
    return decoded; // Retorna os dados contidos no token (payload)
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return { erro: "Token expirado", message: err.message };
    }
    if (err.name === "JsonWebTokenError") {
      return { erro: "Token inválido", message: err.message };
    }
    return { erro: "Erro ao verificar token", message: err.message };
  }
}
```

### Explicação dos Parâmetros:

- **token**: O JWT que você quer verificar.
- **SECRET_KEY**: A mesma chave secreta que foi usada para gerar o token. Ela é usada para verificar a autenticidade do token.

### Erros Comuns:

- **TokenExpiredError**: O token expirou.
- **JsonWebTokenError**: O token é inválido ou foi manipulado.
- **Erro genérico**: Outros erros que podem ocorrer, como falha na decodificação.

## Utilizando o Token nas Requisições

### Exemplo de Middleware para Autenticação

```javascript
import { verificarToken } from "./utils/gerarToken.js"; // Supondo que você tenha o arquivo gerarToken.js

export function autenticarRequisicao(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Espera o token no header como "Bearer token"

  if (!token) {
    return res.status(403).json({ erro: "Token não fornecido" });
  }

  const decoded = verificarToken(token);

  if (decoded.erro) {
    return res
      .status(401)
      .json({ erro: decoded.erro, mensagem: decoded.message });
  }

  req.usuarioId = decoded.id; // Armazena o ID do usuário na requisição
  next(); // Chama a próxima função ou middleware
}
```

### Exemplo de Rota Protegida

```javascript
app.get("/me", autenticarRequisicao, (req, res) => {
  res.json({ id: req.usuarioId, message: "Acesso autorizado!" });
});
```

## Expiração do Token

O JWT possui um campo **`exp`** (expiração), que define quando o token se torna inválido. Você pode especificar a expiração ao criar o token com a opção `expiresIn`.

### Exemplo de Expiração:

```javascript
jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" }); // Expira em 1 hora
```

### Notas sobre a Expiração:

- O JWT **não pode ser invalidado antes de sua expiração** sem alguma forma de controle adicional (como armazenar o token em um banco de dados ou criar uma lista de tokens revogados).
- A **expiração** ajuda a limitar a janela de tempo em que o token pode ser usado.

## Conclusão

O `jsonwebtoken` é uma ótima ferramenta para autenticação baseada em tokens em aplicações web. Ele é eficiente, fácil de usar e oferece segurança para transmitir informações de forma compacta. Não se esqueça de sempre usar uma **chave secreta segura** e de **manter a chave em segurança** (por exemplo, usando variáveis de ambiente).

### Dicas:

1. **Nunca exponha sua chave secreta** em código público. Use variáveis de ambiente (`process.env`) para armazená-la.
2. Tokens expirados são uma boa prática para limitar o tempo de vida de um token e aumentar a segurança.
3. Use um middleware de autenticação para proteger rotas sensíveis que requerem um token válido.

## Referência

- [Documentação oficial do jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
