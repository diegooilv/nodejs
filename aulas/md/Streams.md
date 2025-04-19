## 🧪 **Readable Stream** (leitura de dados)

Usado quando você quer *emitir dados aos poucos*, como ler arquivos, sockets, ou gerar dados customizados.

```js
import { Readable } from 'node:stream';

// Cria uma stream que vai gerar números de 1 a 5, um por vez
class MyReadableStream extends Readable {
  index = 1;

  _read() {
    // Essa função é chamada automaticamente quando a stream precisa de mais dados
    const i = this.index++;

    // Simula atraso com setTimeout
    setTimeout(() => {
      if (i > 5) {
        // Quando acabar os dados, empurra null para sinalizar o fim
        this.push(null);
      } else {
        const buf = Buffer.from(String(i)); // converte o número para Buffer
        console.log(`Enviando: ${i}`);
        this.push(buf); // empurra o chunk para o consumidor
      }
    }, 500);
  }
}

// Conecta a stream de leitura ao stdout (terminal)
new MyReadableStream().pipe(process.stdout);
```

🧠 **Resumo**: cria uma stream que emite números como texto, um a cada 500ms, e imprime no terminal usando `.pipe`.

---

## ✏️ **Writable Stream** (escrita de dados)

Usado pra *receber e processar dados* que vêm de uma fonte (ex: salvar em arquivo, banco, etc).

```js
import { Writable } from 'node:stream';

// Cria uma Writable que só imprime os dados recebidos
class MyWritableStream extends Writable {
  _write(chunk, encoding, callback) {
    // chunk: pedaço de dado recebido
    // encoding: codificação (geralmente 'buffer')
    // callback: função que você chama quando terminar de processar

    console.log(`Recebido: ${chunk.toString()}`);
    callback(); // sinaliza que terminou de processar esse chunk
  }
}

// Envia dados manualmente pra Writable
const myWritable = new MyWritableStream();

myWritable.write('Linha 1\n');
myWritable.write('Linha 2\n');
myWritable.end('Fim\n'); // encerra a stream
```

🧠 **Resumo**: você escreve manualmente dados pra stream, que processa cada chunk.

---

## 🔄 **Duplex Stream** (leitura + escrita)

Stream que pode **ler e escrever ao mesmo tempo**, como sockets ou conexões de rede.

```js
import { Duplex } from 'node:stream';

// Cria uma Duplex Stream que simplesmente devolve tudo em maiúsculas
class MyDuplexStream extends Duplex {
  _read(size) {
    // Neste caso, não vamos gerar nada automaticamente
  }

  _write(chunk, encoding, callback) {
    const input = chunk.toString().trim();
    const output = input.toUpperCase() + '\n';

    this.push(output); // envia como leitura
    callback(); // terminou de processar
  }
}

// Cria a stream
const duplex = new MyDuplexStream();

// Lê o que foi enviado pra stream e mostra no terminal
duplex.on('data', (chunk) => {
  console.log(`Saída: ${chunk.toString()}`);
});

// Escreve dados pra stream
duplex.write('olá mundo');
duplex.write('testando duplex');
duplex.end();
```

🧠 **Resumo**: é uma stream que pode receber dados com `write()` e também emitir dados com `push()`.

---

## 🔁 **Transform Stream** (duplex com transformação)

Usado pra **transformar os dados no meio do caminho** — tipo converter texto, fazer parse de CSV, comprimir, etc.

```js
import { Transform } from 'node:stream';

// Cria uma Transform que converte tudo pra maiúsculas
class UpperCaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    const input = chunk.toString();
    const output = input.toUpperCase();

    this.push(output); // envia o dado transformado
    callback(); // terminou esse pedaço
  }
}

// Instancia a stream
const transformStream = new UpperCaseTransform();

// Simula uma entrada (como process.stdin)
transformStream.write('linha 1\n');
transformStream.write('linha 2\n');
transformStream.end();

// Lê os dados transformados
transformStream.on('data', (chunk) => {
  console.log(`Transformado: ${chunk.toString()}`);
});
```

🧠 **Resumo**: ideal pra pipelines, onde você lê, transforma e envia — tipo `csv → objeto JSON`, `texto → hash`, etc.

---

## 🔗 Combinando tudo com `.pipe()`

Você pode montar **pipelines** assim:

```js
readableStream
  .pipe(transformStream)
  .pipe(writableStream);
```

Isso conecta a saída de um na entrada do próximo.

