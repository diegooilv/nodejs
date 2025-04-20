// arquivo copiado de https://github.com/diegooilv/nodejs/blob/main/aulas/rocketseat/src/database.js 
// porém com alterações na linguagem do nome das variáveis e funções para português

import fs from "node:fs/promises";

const caminhoDoBanco = new URL("../db.json", import.meta.url);

export class Database {
  constructor() {
    fs.readFile(caminhoDoBanco, "utf-8")
      .then((conteudo) => {
        this.#banco = JSON.parse(conteudo);
      })
      .catch(() => {
        this.#salvar();
      });
  }

  #banco = {};

  #salvar() {
    fs.writeFile(caminhoDoBanco, JSON.stringify(this.#banco));
  }


  inserir(tabela, dados) {
    if (Array.isArray(this.#banco[tabela])) {
      this.#banco[tabela].push(dados);
    } else {
      this.#banco[tabela] = [dados];
    }
    this.#salvar();
    return dados;
  }

  selecionar(tabela, filtros) {
    let registros = this.#banco[tabela] ?? [];

    if (filtros) {
      registros = registros.filter((registro) => {
        return Object.entries(filtros).some(([chave, valor]) => {
          if (!registro[chave]) return false;
          return registro[chave].toLowerCase().includes(valor.toLowerCase());
          ;
        });
      });
    }

    return registros;
  }

  deletar(tabela, id) {
    const indiceDoRegistro = this.#banco[tabela].findIndex((registro) => registro.id === id);
    if (indiceDoRegistro > -1) {
      this.#banco[tabela].splice(indiceDoRegistro, 1);
      this.#salvar();
    }
    return;
  }

  atualizar(tabela, id, novosDados) {
    const indiceDoRegistro = this.#banco[tabela].findIndex((registro) => registro.id === id);
    if (indiceDoRegistro > -1) {
      this.#banco[tabela][indiceDoRegistro] = { id, ...novosDados };
      this.#salvar();
    }
    return;
  }
}
