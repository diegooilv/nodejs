// Função que transforma uma rota com parâmetros em uma expressão regular (RegExp)
// Exemplo de entrada: "/users/:id"
// Retorno: uma RegExp que consegue identificar e extrair o valor do `:id`
export function buildRoutesPath(caminho) {
    // Expressão regular para encontrar todos os parâmetros de rota (ex: ":id", ":slug")
    const expressaoDeParametro = /:([a-zA-Z]+)/g;
  
    // Substitui cada parâmetro (ex: ":id") por uma parte da RegExp que captura o valor correspondente
    // (?<nome>) é uma named capture group — ela dá um nome ao valor capturado
    // Resultado: "/users/:id" vira "/users/(?<id>[a-z0-9-_]+)"
    const caminhoComParametros = caminho.replaceAll(
      expressaoDeParametro,
      "(?<$1>[a-z0-9-_]+)"
    );
  
    // Apenas para visualização no console: mostra todos os parâmetros encontrados
    console.log(Array.from(caminho.matchAll(expressaoDeParametro)));
  
    // Cria a expressão regular completa, incluindo a parte final opcional de query string (ex: "?sort=desc")
    const expressaoFinal = new RegExp(`^${caminhoComParametros}(?<query>\\?(.*))?$`);
  
    // Retorna a RegExp pronta para ser usada na correspondência com URLs reais
    return expressaoFinal;
  }
  