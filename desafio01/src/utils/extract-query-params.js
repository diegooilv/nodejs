// Função para extrair os parâmetros da query string (ex: ?nome=Diego&idade=20)
export function extractQueryParams(query) {
    return query
      .substr(1) // Remove o caractere "?" do início da query
      .split("&") // Separa os parâmetros usando o "&" como separador → ['nome=Diego', 'idade=20']
      .reduce((parametrosDeConsulta, parametro) => {
        const [chave, valor] = parametro.split("="); // Divide cada par em chave e valor → ['nome', 'Diego']
  
        // Adiciona ao objeto final: { nome: 'Diego' }, depois { nome: 'Diego', idade: '20' }
        parametrosDeConsulta[chave] = valor;
  
        return parametrosDeConsulta; // Retorna o objeto acumulado
      }, {}); // Começa com um objeto vazio
  }
  