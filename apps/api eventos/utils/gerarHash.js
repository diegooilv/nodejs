import bcrypt from "bcrypt";

export async function gerarHashDaSenha(senhaTexto) {
  const numeroDeRodadas = 15;
  return await bcrypt.hash(senhaTexto, numeroDeRodadas);
}
