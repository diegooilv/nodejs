# 📦 Buffers no Node.js

## O que é um Buffer?

Um **Buffer** em Node.js é uma forma de manipular **dados binários brutos** diretamente da memória.

Esses dados não são strings nem objetos, são **bytes** — e os Buffers servem para lidar com eles de forma eficiente, principalmente em operações de:

- Streams
- Arquivos
- Redes (como o `http`)
- Codificações (base64, hex, etc)

---

## Por que existem Buffers?

Node.js é voltado para I/O (entrada e saída), e muitas vezes você vai trabalhar com **dados que ainda não foram convertidos para string** — por exemplo:

- Dados que chegam pela **rede** (como no `req` do HTTP)
- Dados de **arquivos binários**
- Transmissão de áudio/vídeo
- Upload de arquivos

---

## Criando Buffers

```js
const buf = Buffer.from("Olá mundo");
console.log(buf); // <Buffer c3 8f 6c c3 a1 20 6d 75 6e 64 6f>
```

- Cada caractere vira **1 ou mais bytes**
- `"Olá mundo"` foi convertido para binário UTF-8

---

## Lendo Buffers

```js
const buf = Buffer.from("Diego");
console.log(buf.toString()); // Diego
```

- `toString()` converte os bytes de volta para string.

---

## Juntando Buffers

```js
const buf1 = Buffer.from("Diego ");
const buf2 = Buffer.from("Silva");

const bufCompleto = Buffer.concat([buf1, buf2]);
console.log(bufCompleto.toString()); // Diego Silva
```

---

## Buffer em Streams (exemplo com HTTP)

```js
const buffers = [];

for await (const chunk of req) {
  buffers.push(chunk); // chunk = pedaço do corpo (em Buffer)
}

const body = Buffer.concat(buffers).toString();
```

- Quando uma requisição é enviada com corpo (ex: POST), ela **chega aos poucos** como Buffers.
- Você **acumula em um array**, junta com `Buffer.concat`, e converte pra string pra fazer o `JSON.parse`.

---

## Tamanho de Buffers

```js
const buf = Buffer.from("Hello");
console.log(buf.length); // 5
```

- Cada caractere ASCII = 1 byte
- Caracteres especiais podem usar mais (como emojis, acentos)

---

## Criar um buffer "em branco"

```js
const buf = Buffer.alloc(10);
console.log(buf); // <Buffer 00 00 00 00 00 00 00 00 00 00>
```

- Cria um buffer de 10 bytes, preenchido com zeros

---

## Codificações suportadas

Você pode usar:

- `'utf8'` (padrão)
- `'hex'`
- `'base64'`
- `'ascii'`

```js
const b64 = Buffer.from("Diego").toString("base64");
console.log(b64); // RGlld28=
```

---

## Quando usar Buffer?

- Manipular arquivos
- Trabalhar com streams
- Receber dados em HTTP
- Lidar com codificações binárias
- Imagens, uploads, downloads

---

## TL;DR

| Conceito      | Explicação rápida                   |
| ------------- | ----------------------------------- |
| `Buffer`      | Dados binários na memória           |
| `.from()`     | Cria a partir de string/array/dados |
| `.toString()` | Converte de volta pra string        |
| `.concat()`   | Junta vários Buffers                |
| `.alloc(n)`   | Cria um Buffer de n bytes zerados   |

---

## 🚀 Exemplo real (req body)

```js
const buffers = [];

for await (const chunk of req) {
  buffers.push(chunk); // cada chunk é um Buffer
}

const data = Buffer.concat(buffers).toString(); // junta tudo
const body = JSON.parse(data); // transforma em JSON
```

---

## Referência

- [Documentação oficial do Node.js](https://nodejs.org/api/buffer.html)
