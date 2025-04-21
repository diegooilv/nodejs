import bcrypt from "bcryptjs";
export async function compararSenhas(senhaDigitada, senhaSalva) {
  return await bcrypt.compare(senhaDigitada, senhaSalva);
}
