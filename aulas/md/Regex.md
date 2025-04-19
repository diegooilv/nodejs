# Introdução a Regex (Expressões Regulares)

Regex (ou Regular Expressions) é uma linguagem usada para buscar, validar ou manipular **padrões de texto**. Muito usada em validações, buscas em arquivos e substituições de texto.

---

## ✨ Para que serve?

- Verificar se um e-mail é válido
- Extrair números de um texto
- Encontrar palavras específicas
- Substituir padrões em strings
- Validar senhas, CPF, CEP etc.

---

## 🧠 Sintaxe Básica

| Símbolo  | Significado                       | Exemplo                       |
| -------- | --------------------------------- | ----------------------------- | ----- | --------- |
| `.`      | Qualquer caractere (exceto \n)    | `a.b` → `acb`, `arb`          |
| `*`      | 0 ou mais repetições              | `bo*` → `b`, `booo`           |
| `+`      | 1 ou mais repetições              | `go+` → `go`, `goo`           |
| `?`      | 0 ou 1 ocorrência (opcional)      | `colou?r` → `color`, `colour` |
| `\d`     | Qualquer dígito (0-9)             | `\d\d\d` → `123`              |
| `\w`     | Letra, número ou underline        | `\w+` → `hello_123`           |
| `\s`     | Qualquer espaço (espaço, tab)     | `\s+` → espaço                |
| `^`      | Início da string                  | `^Olá` → `Olá mundo`          |
| `$`      | Fim da string                     | `fim$` → `até o fim`          |
| `[abc]`  | Um caractere entre os listados    | `[aeiou]`                     |
| `[^abc]` | Qualquer caractere exceto a, b, c | `[^aeiou]`                    |
| `(abc)`  | Grupo                             | `(ab)+` → `abab`              |
| `|`      | OU lógico                         | `azul|vermelho`               |

---

## 📌 Exemplos Práticos

### 🔹 Validar um e-mail (simplificado)

```regex
^\w+@\w+\.\w+$
```

**Explica:**

- `^\w+` → Início com letras ou números
- `@` → Símbolo obrigatório
- `\w+` → Domínio
- `\.` → Ponto
- `\w+$` → Extensão final

---

### 🔹 Encontrar números em uma string

```regex
\d+
```

---

### 🔹 Verificar CEP (formato: 12345-678)

```regex
^\d{5}-\d{3}$
```

---

### 🔹 Validar senha forte (mínimo 8, letra maiúscula, número e caractere especial)

```regex
^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
```

---

## 🧪 Testar Regex

Você pode testar suas expressões regulares nesses sites:

- [regex101.com](https://regex101.com)
- [regexr.com](https://regexr.com)
- [devtools: regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

---

## ✅ Dicas

- Use `()` para agrupar e capturar
- Use `?:` dentro do grupo para **não capturar**: `(?:abc)`
- Escape caracteres especiais com `\` → por exemplo, `\.` para ponto literal
